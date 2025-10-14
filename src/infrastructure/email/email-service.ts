import nodemailer from 'nodemailer'
import { LoggerService } from '@/domain/services/LoggerService'
import { env } from '@/shared/config/env'
import type { Author } from '@/shared/types/author'

const loggerService = new LoggerService()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: env.GOOGLE_EMAIL,
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    refreshToken: env.GOOGLE_REFRESH_TOKEN
  }
})

interface EmailPayload {
  receiver: Author
  subject: string
  html: string
}

const sendEmail = async (payload: EmailPayload) => {
  const { email } = payload.receiver

  const mailOptions = {
    from: `'My Tasks' <${env.GOOGLE_EMAIL}>`,
    to: email,
    subject: payload.subject,
    html: payload.html
  }

  await transporter.sendMail(mailOptions)
  loggerService.createEmailLog({
    from: mailOptions.from,
    to: mailOptions.to,
    subject: mailOptions.subject,
    userId: payload.receiver.id
  })
}

export { sendEmail }
