import { env } from '@/shared/config/env'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './src/infra/data/drizzle',
  schema: './src/infra/data/schemas.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL
  }
})
