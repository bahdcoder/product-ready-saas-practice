import Koa from 'koa'
import { validateAll } from 'indicative/validator'
import ValidationException from '@/exceptions/validation'

class RegisterController {
    store = async (ctx: Koa.Context) => {
        // validate
        await this.validate(ctx.response.body)

        // validate the user is unique

        // create user

        // send a response
    }

    private validate = async (data: {} = {}) => {
        try {
            await validateAll(data, {
                email: 'required|email',
                password: 'required|min:6',
                name: 'required'
            })
        } catch (errors) {
            throw new ValidationException(errors)
        }
    }
}

export default new RegisterController
