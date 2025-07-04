import { pgTable, uuid, varchar, date, boolean } from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 60 }).notNull(),
  email: varchar('email', { length: 120 }).notNull().unique(),
  password: varchar('password', { length: 60 }).notNull()
})

export const tasksTable = pgTable('tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 60 }).notNull(),
  description: varchar('description', { length: 255 }),
  dueDate: date('due_date', { mode: 'date' }).notNull(),
  isCompleted: boolean('is_completed').notNull().default(false),
  userId: uuid('user_id')
    .references(() => usersTable.id, { onDelete: 'cascade' })
    .notNull()
})
