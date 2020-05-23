import Koa from 'koa'
import Router from 'koa-router'
import register from '@/controllers/auth/register'
import login from '@/controllers/auth/login'

const router = new Router()

router.post('/auth/login', login.store)
router.post('/auth/register', register.store)

export default router
