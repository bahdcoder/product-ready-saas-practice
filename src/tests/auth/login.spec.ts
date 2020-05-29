import test from 'ava'
import app from '@/server'
import Faker from 'faker'
import User from '@/models/user'
import Supertest from 'supertest'

const client = Supertest(app.callback())

test.serial('login data is validated before being processed', async t => {
    console.log = () => {}
    const response = await client.post(`/auth/login`).send({})

    t.is(response.status, 422)
    t.is(response.body.message, 'Validation failed.')

    t.snapshot(response.body.errors)
})

test.serial('can successfully login a user', async t => {
    const testUser = {
        name: Faker.name.findName(),
        email: Faker.internet.email(),
        password: 'password'
    }

    await client.post('/auth/register').send(testUser)

    const response = await client.post(`/auth/login`).send(testUser)

    t.is(response.status, 200)
    t.truthy(response.body.token)

    const verifiedUser = await User.verifyAuthToken(response.body.token)

    t.is(response.body.user.email, verifiedUser?.email)
})
