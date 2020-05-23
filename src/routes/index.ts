import Koa from 'koa'
import Router from 'koa-router'

const router = new Router()

router.get('/', (ctx: Koa.Context) => {
    ctx.response.body = {
        hello: 'world'
    }
})

export default router
