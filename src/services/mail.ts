import Fs from 'fs'
import Path from 'path'
import Config from '@/config'
import Mustache from 'mustache'
import Nodemailer from 'nodemailer'
import { UserDocument } from '@/models/user'

class Mailer {
    public transport = Nodemailer.createTransport({
        host: Config.mail.host,
        port: Config.mail.port as number,
        auth: {
            user: Config.mail.auth.user,
            pass: Config.mail.auth.pass
        }
    })

    public async send(name: string, user: UserDocument, data: {} = {}) {
        const content = Mustache.render(this.getMailContent(name), {
            user,
            ...data
        })

        this.transport.sendMail({
            to: user.email,
            html: content
        })
    }

    getMailContent = (name: string) => {
        const content = Fs.readFileSync(
            Path.resolve(__dirname, '..', 'mails', `${name}.mustache`)
        ).toString()

        return content
    }
}

export default new Mailer
