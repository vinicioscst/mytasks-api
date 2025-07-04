import { pgTable, uuid, varchar, date } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 60 }),
  email: varchar('email', { length: 120 }).unique(),
  password: varchar('password', { length: 60 })
})

export const tasks = pgTable('tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 60 }),
  description: varchar('description', { length: 255 }),
  dueDate: date('due_date', { mode: 'date' }),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull()
})
