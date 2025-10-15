import { relations } from 'drizzle-orm'
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar
} from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 60 }).notNull(),
  email: varchar('email', { length: 120 }).notNull().unique(),
  avatar: varchar('avatar', { length: 255 }).notNull(),
  password: varchar('password', { length: 60 }).notNull()
})

export const usersRelations = relations(usersTable, ({ many }) => ({
  tasks: many(tasksTable),
  emailsLog: many(emailsLogTable),
  errorsLog: many(errorsLogTable)
}))

export const tasksTable = pgTable('tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 60 }).notNull(),
  description: varchar('description', { length: 255 }),
  dueDate: timestamp('due_date', {
    withTimezone: true,
    mode: 'date'
  }).notNull(),
  isCompleted: boolean('is_completed').notNull().default(false),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
})

export const tasksRelations = relations(tasksTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [tasksTable.userId],
    references: [usersTable.id]
  })
}))

export const emailsLogTable = pgTable('emails_log', {
  id: uuid('id').primaryKey().defaultRandom(),
  sentAt: timestamp('sent_at').defaultNow(),
  subject: varchar('subject', { length: 120 }).notNull(),
  from: varchar('from', { length: 120 }).notNull(),
  to: varchar('to', { length: 120 }).notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
})

export const emailsLogRelations = relations(emailsLogTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [emailsLogTable.userId],
    references: [usersTable.id]
  })
}))

export const errorsLogTable = pgTable('errors_log', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => usersTable.id, {
    onDelete: 'set null',
    onUpdate: 'cascade'
  }),
  requestContext: varchar('request_context', { length: 100 })
    .notNull()
    .default('unknown'),
  errorMessage: varchar('error_message', { length: 1000 }).notNull(),
  errorStack: text('error_stack'),
  httpStatus: integer('http_status').notNull(),
  requestUrl: varchar('request_url', { length: 500 }).notNull(),
  requestMethod: varchar('request_method', { length: 10 }).notNull(),
  createdAt: timestamp('created_at').defaultNow()
})

export const errorsLogRelations = relations(errorsLogTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [errorsLogTable.userId],
    references: [usersTable.id]
  })
}))
