import { pgTable, uuid, varchar, date, boolean } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const usersTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 60 }).notNull(),
  email: varchar('email', { length: 120 }).notNull().unique(),
  avatar: varchar('avatar', { length: 255 }).notNull(),
  password: varchar('password', { length: 60 }).notNull()
})

export const usersRelations = relations(usersTable, ({ many }) => ({
  tasks: many(tasksTable)
}))

export const tasksTable = pgTable('tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 60 }).notNull(),
  description: varchar('description', { length: 255 }),
  dueDate: date('due_date', { mode: 'date' }).notNull(),
  isCompleted: boolean('is_completed').notNull().default(false),
  userId: uuid('user_id').notNull()
})

export const tasksRelations = relations(tasksTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [tasksTable.userId],
    references: [usersTable.id]
  })
}))
