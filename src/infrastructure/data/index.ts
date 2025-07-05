import { env } from '@/shared/config/env'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schemas from './schemas'

const client = postgres(env.DATABASE_URL, { prepare: false })
export const db = drizzle(client, { schema: { ...schemas } })
