import Dotenv from 'dotenv'

Dotenv.config()

export default {
    port: process.env.PORT || 3000,
    databaseUri: process.env.DATABASE_URI || 'mongodb://localhost/standups-online'
}
