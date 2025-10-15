import 'dotenv/config'
import z from 'zod/v4'

const envSchema = z.object({
  PORT: z
    .string()
    .nonempty({ error: 'PORT variable is empty' })
    .transform((val) => Number(val)),
  APP_URL: z.url().nonempty({ error: 'APP_URL variable is empty' }),
  DATABASE_URL: z
    .string()
    .nonempty({ error: 'DATABASE_URL variable is empty' }),
  JWT_SECRET: z.string().nonempty({ error: 'JWT_SECRET variable is empty' }),
  RABBITMQ_URL: z
    .string()
    .nonempty({ error: 'RABBITMQ_URL variable is empty' }),
  GOOGLE_EMAIL: z.email().nonempty({ error: 'GOOGLE_EMAIL variable is empty' }),
  GOOGLE_CLIENT_ID: z
    .string()
    .nonempty({ error: 'GOOGLE_CLIENT_ID variable is empty' }),
  GOOGLE_CLIENT_SECRET: z
    .string()
    .nonempty({ error: 'GOOGLE_CLIENT_SECRET variable is empty' }),
  GOOGLE_REFRESH_TOKEN: z
    .string()
    .nonempty({ error: 'GOOGLE_REFRESH_TOKEN variable is empty' })
})

export const env = envSchema.parse(process.env)
