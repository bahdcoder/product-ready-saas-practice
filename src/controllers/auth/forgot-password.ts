import Koa from 'koa'
import Bcrypt from 'bcryptjs'
import User from '@/models/user'
import Mailer from '@/services/mail'
import { addMinutes } from 'date-fns'
import Randomstring from 'randomstring'
import { validateAll } from 'indicative/validator'
import ValidationException from '@/exceptions/validation'

class ForgotPasswordController {
    store = async (ctx: Koa.Context) => {
        // validate
        await this.validate(ctx.request.body)

        // find a user
        const user = await User.findOne({
            email: ctx.request.body.email
        })

        if (user) {
            const token = Randomstring.generate(64)
            user.passwordReset = {
                token,
                expiresAt: addMinutes(new Date(), 15)
            }

            await Mailer.send('forgot-password', user, {
                token
            })

            await user.save()
        }

        ctx.response.status = 200
        ctx.response.body = {
            message: 'If this email has an account with us, you will receive an email with instructions on how to reset your password.'
        }
    }

    private validate = async (data: { email?: string } = {}) => {
        try {
            await validateAll(data, {
                email: 'required|email',
            })
        } catch (errors) {
            throw new ValidationException(errors)
        }
    }
}

export default new ForgotPasswordController
