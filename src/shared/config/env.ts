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
  JWT_SECRET: z.string().nonempty({ error: 'JWT_SECRET variable is empty' })
})

export const env = envSchema.parse(process.env)
