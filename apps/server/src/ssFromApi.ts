import { Hono } from 'hono'
const app = new Hono()

app.get('/screenshotFromApi', async (c) => {
    const query = c.req.query()
    const w =  parseInt(c.req.query().w) || 1920;
    const h =  parseInt(c.req.query().h) || 1080;
    const url = query.url;
    if(!url) return c.text('url is required')

    let apiUrl = `https://urlscan.io/liveshot/?width=${w}&height=${h}&url=${url}`
    if(!query.type || query.type == '1'){
        apiUrl = `https://urlscan.io/liveshot/?width=${w}&height=${h}&url=${url}`
    }else if(query.type == '2'){
        apiUrl = `https://s0.wp.com/mshots/v1/${url}/?w=${w}&h=${h}`
    }
    console.log(`apiUrl: ${apiUrl}`)
  return fetch(apiUrl)
})
export default app