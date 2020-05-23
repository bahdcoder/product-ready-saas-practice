import Koa from 'koa'

import router from '@/routes'

export default (app: Koa) => {
    app.use(router.routes())

    app.use(router.allowedMethods())
}
