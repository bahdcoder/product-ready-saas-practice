import test from 'ava'
import Faker from 'faker'
import app from '@/server'
import User from '@/models/user'
import Supertest from 'supertest'

const client = Supertest(app.callback())

test('register data is validated before being processed', async t => {
    console.log = () => {}
    const response = await client.post(`/auth/register`).send({})

    t.is(response.status, 422)
    t.is(response.body.message, 'Validation failed.')

    t.snapshot(response.body.errors)
})

test.serial('can successfully register a user', async t => {
    const testUser = {
        name: Faker.name.findName(),
        email: Faker.internet.email(),
        password: 'password'
    }

    const response = await client.post(`/auth/register`).send(testUser)

    t.is(response.status, 201)
    t.truthy(response.body.token)

    const user = await User.findOne({
        email: testUser.email
    })

    t.is(user?.email, testUser.email)
    t.is(user?.name, testUser.name)

    const verifiedUser = await User.verifyAuthToken(response.body.token)

    t.is(user?.email, verifiedUser?.email)
})
