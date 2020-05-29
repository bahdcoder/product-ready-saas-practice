import Koa from 'koa'
import BodyParser from 'koa-bodyparser'
import Auth from '@/setup/middleware/auth'

export default (app: Koa) => {
    app.use(BodyParser())

    app.use(Auth)
}
