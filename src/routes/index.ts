import Koa from 'koa'
import Router from 'koa-router'
import register from '@/controllers/auth/register'
import login from '@/controllers/auth/login'
import forgotPassword from '@/controllers/auth/forgot-password'

const router = new Router()

router.post('/auth/login', login.store)
router.post('/auth/register', register.store)
router.post('/auth/forgot-password', forgotPassword.store)

export default router
