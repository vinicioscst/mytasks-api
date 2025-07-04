import { env } from '@/shared/config/env'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './src/infrastructure/data/drizzle',
  schema: './src/infrastructure/data/schemas.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL
  }
})
