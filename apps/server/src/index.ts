import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import  ssFromPuppter from './ssFromPuppter'
import  ssFromApi from './ssFromApi'
const app = new Hono().basePath('/api')

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/', ssFromPuppter)
app.route('/', ssFromApi)

const port = 3001
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
