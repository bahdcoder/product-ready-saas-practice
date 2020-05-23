import Koa from 'koa'
import setupRouter from '@/setup/router'
import setupDatabase from '@/setup/database'
import setupMiddleware from '@/setup/middleware'

const app = new Koa()

setupMiddleware(app)

setupRouter(app)

setupDatabase()

export default app
