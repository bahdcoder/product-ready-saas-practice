import Dotenv from 'dotenv'

Dotenv.config()

export default {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'test-secret',
    databaseUri: process.env.DATABASE_URI || 'mongodb://localhost/standups-online'
}
