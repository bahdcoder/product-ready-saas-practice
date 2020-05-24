import Koa from 'koa'
import Bcrypt from 'bcryptjs'
import User from '@/models/user'
import { isAfter } from 'date-fns'
import { validateAll } from 'indicative/validator'
import ValidationException from '@/exceptions/validation'

class ResetPasswordController {
    store = async (ctx: Koa.Context) => {
        // validate
        await this.validate(ctx.request.body)

        const user = await User.findOne({
            'passwordReset.token': ctx.request.body.token
        })

        if (! user) {
            throw new ValidationException([{
                message: 'Invalid reset token',
                field: 'token'
            }])
        }

        if (
            isAfter(
                new Date(),
                new Date(user.passwordReset.expiresAt!)
            )
        ) {
            throw new ValidationException([{
                message: 'Invalid reset token',
                field: 'token'
            }])
        }

        user.password = Bcrypt.hashSync(ctx.request.body.password)
        user.passwordReset = {
            expiresAt: null,
            token: null
        }

        await user.save()

        ctx.response.status = 200
        ctx.response.body = {
            message: 'Password has been reset.'
        }
    }

    private validate = async (data: { email?: string } = {}) => {
        try {
            await validateAll(data, {
                token: 'required',
                password: 'required|min:6'
            })
        } catch (errors) {
            throw new ValidationException(errors)
        }
    }
}

export default new ResetPasswordController