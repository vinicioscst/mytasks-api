import { env } from '@/shared/config/env'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './src/infra/db/drizzle',
  schema: './src/infra/db/schemas.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL
  }
})
