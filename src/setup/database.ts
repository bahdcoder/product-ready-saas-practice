import Config from '@/config'
import Mongoose from 'mongoose'

export default () => Mongoose.connect(Config.databaseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
