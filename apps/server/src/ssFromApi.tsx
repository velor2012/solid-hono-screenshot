import { Hono } from 'hono'
import { env } from 'hono/adapter'
import type { FC } from 'hono/jsx'

const Layout: FC = (props) => {
  return (
    <html>
      <body>{props.children}</body>
    </html>
  )
}

const Top: FC<{ url: string }> = (props: { url: string }) => {
    return (
      <Layout>
        <div style={{width: '100vw', overflow: 'scroll', display: 'flex', justifyContent: 'center'}}>
            <img src={props.url} style={{width: '100%'}}/>
        </div>
      </Layout>
    )
  }

const app = new Hono()

app.get('/screenshotFromApi', async (c) => {
    const query = c.req.query()
    const w =  parseInt(c.req.query().w) || 1920;
    const h =  parseInt(c.req.query().h) || 1080;
    const url = query.url;
    const returnHtml = query.returnHtml; // valid when type == 4
    if(!url) return c.text('url is required')

    let apiUrl = `https://urlscan.io/liveshot/?width=${w}&height=${h}&url=${url}`
    if(!query.type || query.type == '1'){
        apiUrl = `https://urlscan.io/liveshot/?width=${w}&height=${h}&url=${url}`
    }else if(query.type == '2'){
        apiUrl = `https://s0.wp.com/mshots/v1/${url}/?w=${w}&h=${h}`
    }else if(query.type == '3'){
        if(!process.env.URL2PICKEY){
            const { URL2PICKEY } = env<{ URL2PICKEY: string }>(c)
            console.log(URL2PICKEY)
            console.log(process.env)
            return c.text('URL2PICKEY is required')
        }
        apiUrl = `https://url2pic.php127.com/api/url2pic`
        const formData = new FormData()
        formData.append('url', url)
        formData.append('width', String(w))
        formData.append('type', 'png')
        formData.append('key', process.env.URL2PIC_API_KEY || '')
        const res = await fetch(apiUrl, {
            method: 'POST',
            body: formData
        })
        const link = (await res.json()).data.download_link
        apiUrl = link
        // return c.newResponse(res.body)
    }else if(query.type == '4'){
        apiUrl = 'https://www.coderbbb.com/api/tools/screenshot/do'
        const formData = new FormData()
        formData.append('url', url)
        const res = await fetch(apiUrl, {
            method: 'POST',
            body: formData
        })
        const base64Data = (await res.json()).data
        if(returnHtml) return c.html(<Top url={`data:image/png;base64,${base64Data}`}></Top>)
        return c.newResponse(`data:image/png;base64,${base64Data}`)
    }
    console.log(`apiUrl: ${apiUrl}`)
  return fetch(apiUrl)
})
export default app