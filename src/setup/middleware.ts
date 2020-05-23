import Koa from 'koa'
import BodyParser from 'koa-bodyparser'

export default (app: Koa) => {
    app.use(BodyParser())
}
