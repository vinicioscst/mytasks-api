import 'dotenv/config'
import z from 'zod/v4'

const envSchema = z.object({
  PORT: z
    .string()
    .nonempty({ error: 'PORT variable is empty' })
    .transform((val) => Number(val))
})

export const env = envSchema.parse(process.env)
