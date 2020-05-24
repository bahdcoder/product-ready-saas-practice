import Jwt from 'jsonwebtoken'
import Mongoose from 'mongoose'
import config from '@/config'

const UserSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    passwordReset: {
        token: String,
        expiresAt: Date
    }
}, { timestamps: true })

UserSchema.methods.getAuthToken = function () {
    return Jwt.sign({
        _id: this._id
    }, config.jwtSecret, {
        expiresIn: '7d'
    })
}

export interface UserDocument extends Mongoose.Document {
    getAuthToken: () => string
    name: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
    passwordReset: {
        token: string
        expiresAt: Date
    }
}

export default Mongoose.model<UserDocument>('User', UserSchema)
