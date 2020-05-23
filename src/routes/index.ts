import Koa from 'koa'
import Router from 'koa-router'
import register from '@/controllers/auth/register'

const router = new Router()

router.post('/auth/register', register.store)

export default router
