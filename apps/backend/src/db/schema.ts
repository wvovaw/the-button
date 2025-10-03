import { relations, sql } from 'drizzle-orm'
import { int, integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: int('id').primaryKey({ autoIncrement: true }),
  email: text('email', { length: 255 }).notNull().unique(),
  name: text('name', { length: 255 }).unique(),
  password: text('password').notNull(),
  salt: text('salt').notNull(),
})

export const records = sqliteTable('records', {
  id: int('id').primaryKey({ autoIncrement: true }),
  ownerId: int('ownerId').notNull().unique(),
  highscore: int('highscore').notNull(),
  totalResets: int('totalResets').notNull(),
  totalClicks: int('totalClicks').notNull(),
  average: real('average').notNull(),
  averageWeight: int('averageWeight').notNull(),
  createdAt: integer('createdAt', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`).notNull(),
  // TOOD: make it updating on each update
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`).notNull(),
})

export const usersRelations = relations(users, ({ one }) => ({
  record: one(records, {
    fields: [users.id],
    references: [records.ownerId],
  }),
}))

export const recordsRelations = relations(records, ({ one }) => ({
  owner: one(users, {
    fields: [records.ownerId],
    references: [users.id],
  }),
}))

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export type Record = typeof records.$inferSelect
export type NewRecord = typeof records.$inferInsert
