import Koa from 'koa'
import Bcrypt from 'bcryptjs'
import User from '@/models/user'
import { validateAll } from 'indicative/validator'
import ValidationException from '@/exceptions/validation'

class LoginController {
    store = async (ctx: Koa.Context) => {
        // validate
        await this.validate(ctx.request.body)

        // find a user
        const user = await User.findOne({
            email: ctx.request.body.email
        })

        const reject = () => {
            throw new ValidationException([{
                message: 'These credentials do not match our records.',
                field: 'email'
            }])
        }

        if (! user) {
            reject()
        }

        // validate password
        if (! this.validatePassword(ctx.request.body.password, user!.password)) {
            reject()
        }

        ctx.response.status = 200
        ctx.response.body = {
            user,
            token: user!.getAuthToken()
        }
    }

    private validatePassword = (password: string, userPassword: string) => {
        return Bcrypt.compareSync(password, userPassword)
    }

    private validate = async (data: { email?: string } = {}) => {
        try {
            await validateAll(data, {
                email: 'required|email',
                password: 'required|min:6',
            })
        } catch (errors) {
            throw new ValidationException(errors)
        }
    }
}

export default new LoginController
