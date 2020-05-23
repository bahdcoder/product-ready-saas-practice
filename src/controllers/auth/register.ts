import Koa from 'koa'
import Bcrypt from 'bcryptjs'
import User from '@/models/user'
import { validateAll } from 'indicative/validator'
import ValidationException from '@/exceptions/validation'

class RegisterController {
    store = async (ctx: Koa.Context) => {
        // validate
        await this.validate(ctx.request.body)

        // validate the user is unique
        const user = await User.create(this.getUserPayload(ctx.request.body))

        // create user
        ctx.response.status = 201
        ctx.response.body = {
            user,
            token: user.getAuthToken()
        }
    }

    private getUserPayload = (data: { password: string }) => {
        return {
            ...data,
            password: Bcrypt.hashSync(data.password)
        }
    }

    private validate = async (data: { email?: string } = {}) => {
        try {
            await validateAll(data, {
                email: 'required|email',
                password: 'required|min:6',
                name: 'required'
            })

            const user = await User.findOne({
                email: data.email
            })

            if (user) {
                throw [{
                    message: 'A user with this email already exists.',
                    field: 'email',
                    validation: 'unique'
                }]
            }
           
        } catch (errors) {
            throw new ValidationException(errors)
        }
    }
}

export default new RegisterController
