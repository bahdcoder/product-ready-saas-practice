import Koa from 'koa'
import setupRouter from '@/setup/router'
import setupDatabase from '@/setup/database'
import setupMiddleware from '@/setup/middleware'
import setupErrorHandler from '@/setup/error-handler'

const app = new Koa()

setupErrorHandler(app)

setupMiddleware(app)

setupRouter(app)

setupDatabase()

export default app
