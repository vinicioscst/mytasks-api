import nodemailer from 'nodemailer'
import { LoggerService } from '@/domain/services/LoggerService'
import { env } from '@/shared/config/env'
import type { Author } from '@/shared/types/author'

const loggerService = new LoggerService()

const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: parseInt(env.EMAIL_PORT, 10),
  secure: env.EMAIL_SECURE === 'true',
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASSWORD
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
    from: `'${env.EMAIL_FROM_NAME}' <${env.EMAIL_FROM_EMAIL}>`,
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
