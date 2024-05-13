import { Hono } from 'hono'
import * as puppeteer from 'puppeteer'
const app = new Hono()

let browser: undefined | puppeteer.Browser= undefined
puppeteer.launch({args: ['--no-sandbox', '--lang=zh-CN,zh'],
headless: true}).then((res) => {
    browser = res
    console.log('browser launched')
})

app.get('/screenshot', async (c) => {
    if(!browser) return c.text('browser is not prepared')
    let query = c.req.query();
    const w =  parseInt(query.w) || 1920;
    const h =  parseInt(query.h) || 1080;
    const scaleFactor =  parseInt(query.scaleFactor) || 1;
    const url = query.url;
    if(!url) return c.text('url is required')

    const page = await browser.newPage()
    page.setViewport({
        width: w,
        height: h,
        deviceScaleFactor: scaleFactor,   
    })
    await page.goto(query.url,{waitUntil: 'networkidle0'},)
    // await page.waitForNavigation()
    await page.content();
    const element = await page.$("body");
    //对整个页面截图
    const img = await element!.screenshot({
        encoding: 'binary',
        type: 'png',
    })
    await page.close();
    c.header('Content-Type', 'image/png')
  return c.newResponse(img, 200)
})

export default app
