import Koa from 'koa'

export default (app: Koa) => {
    app.use(async (ctx: Koa.Context, next: Koa.Next) => {
        try {
            await next()
        } catch (error) {
            console.log(error)
            if (error.type === 'ValidationException') {
                ctx.response.status = 422

                ctx.response.body = {
                    message: error.message,
                    errors: error.errors
                }
            }
        }
    })
}
