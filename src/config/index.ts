import Dotenv from 'dotenv'

Dotenv.config()

export default {
    port: process.env.PORT || 3000
}
