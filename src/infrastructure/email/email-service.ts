import nodemailer from 'nodemailer'
import { env } from '@/shared/config/env'

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
  to: string
  subject: string
  html: string
}

const sendEmail = async (payload: EmailPayload) => {
  const mailOptions = {
    from: `'${env.EMAIL_FROM_NAME}' <${env.EMAIL_FROM_EMAIL}>`,
    to: payload.to,
    subject: payload.subject,
    html: payload.html
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error)
    throw error
  }
}

export { sendEmail }
