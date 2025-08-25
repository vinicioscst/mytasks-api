import 'dotenv/config'
import z from 'zod/v4'

const envSchema = z.object({
  PORT: z
    .string()
    .nonempty({ error: 'PORT variable is empty' })
    .transform((val) => Number(val)),
  DATABASE_URL: z
    .string()
    .nonempty({ error: 'DATABASE_URL variable is empty' }),
  JWT_SECRET: z.string().nonempty({ error: 'JWT_SECRET variable is empty' }),
  RABBITMQ_URL: z
    .string()
    .nonempty({ error: 'RABBITMQ_URL variable is empty' }),
  EMAIL_HOST: z.string().nonempty({ error: 'EMAIL_HOST variable is empty' }),
  EMAIL_PORT: z.string().nonempty({ error: 'EMAIL_PORT variable is empty' }),
  EMAIL_SECURE: z
    .string()
    .nonempty({ error: 'EMAIL_SECURE variable is empty' }),
  EMAIL_USER: z.string().nonempty({ error: 'EMAIL_USER variable is empty' }),
  EMAIL_PASSWORD: z
    .string()
    .nonempty({ error: 'EMAIL_PASSWORD variable is empty' }),
  EMAIL_FROM_EMAIL: z
    .email()
    .nonempty({ error: 'EMAIL_FROM_EMAIL variable is empty' }),
  EMAIL_FROM_NAME: z
    .string()
    .nonempty({ error: 'EMAIL_FROM_NAME variable is empty' })
})

export const env = envSchema.parse(process.env)
