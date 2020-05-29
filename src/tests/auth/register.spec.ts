import test from 'ava'
import app from '@/server'
import User from '@/models/user'
import Supertest from 'supertest'

const client = Supertest(app.callback())

test.beforeEach(async () => {
    await User.deleteMany({})
})

test('register data is validated before being processed', async t => {
    console.log = () => {}
    const response = await client.post(`/auth/register`).send({})

    t.is(response.status, 422)
    t.is(response.body.message, 'Validation failed.')

    t.snapshot(response.body.errors)
})

test.serial('can successfully register a user', async t => {
    const response = await client.post(`/auth/register`).send({
        name: 'John Doe',
        email: 'john@doe.com',
        password: 'password'
    })

    t.is(response.status, 201)
    t.truthy(response.body.token)

    const user = await User.findOne({
        email: 'john@doe.com'
    })

    t.is(user?.email, 'john@doe.com')
    t.is(user?.name, 'John Doe')

    const verifiedUser = await User.verifyAuthToken(response.body.token)

    t.is(user?.email, verifiedUser?.email)
})
