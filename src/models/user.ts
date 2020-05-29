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

UserSchema.statics.verifyAuthToken = async function (token: string) {
    try  {
        Jwt.verify(token, config.jwtSecret)

        const payload = Jwt.decode(token) as {
            _id: string
        }

        const user = await this.findOne({
            _id: payload._id
        })

        if (! user) {
            throw new Error()
        }

        return user
    } catch (error) {
        return null
    }
}

export interface UserModel extends Mongoose.Model<UserDocument> {
    verifyAuthToken: (token: string) => Promise<null|UserDocument>
}

export interface UserDocument extends Mongoose.Document {
    getAuthToken: () => string
    name: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
    passwordReset: {
        token: string|null
        expiresAt: Date|null
    }
}

export default Mongoose.model<UserDocument, UserModel>('User', UserSchema)
