import { relations } from 'drizzle-orm'
import { pgTable, uuid, varchar, date } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 60 }),
  email: varchar('email', { length: 120 }),
  password: varchar('password', { length: 60 })
})

export const usersRelations = relations(users, ({ many }) => ({
  tasks: many(tasks)
}))

export const tasks = pgTable('tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 60 }),
  description: varchar('description', { length: 255 }),
  dueDate: date('due_date', { mode: 'date' }),
  userId: uuid('user_id')
})

export const postsRelations = relations(tasks, ({ one }) => ({
  user: one(users, {
    fields: [tasks.userId],
    references: [users.id]
  })
}))
