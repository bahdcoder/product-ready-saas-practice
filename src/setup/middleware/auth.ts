import Koa from 'koa'
import User from '@/models/user'

const extractToken = (bearerToken: string) => {
    const [, token] = (bearerToken || '').split(' ')

    return token
}

const excludeRoutes = [
    '/auth/register',
    '/auth/login',
    '/auth/forgot-password',
    '/auth/reset-password',
]

const auth = async (ctx: Koa.Context, next: Koa.Next) => {
    if (excludeRoutes.includes(ctx.request.url)) {
        return next()
    }

    const user = await User.verifyAuthToken(
        extractToken(ctx.request.headers.authorization)
    )

    if (user) {
        return next()
    }

    ctx.response.status = 401
    ctx.response.body = {
        message: 'Unauthorized.',
    }

    return
}

export default auth
