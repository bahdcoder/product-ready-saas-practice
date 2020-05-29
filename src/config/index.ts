import Dotenv from 'dotenv'

export default {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'test-secret',
    databaseUri: process.env.DATABASE_URI || 'mongodb://localhost/standups-online',
    mail: {
        host: process.env.MAIL_HOST || 'smtp.mailtrap.io',
        port: process.env.MAIL_PORT || 2525,
        auth: {
            user: process.env.MAIL_USERNAME || 'user',
            pass: process.env.MAIL_PASSWORD || 'pass'
        }
    }
}
