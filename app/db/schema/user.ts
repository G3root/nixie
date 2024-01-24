import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const user = sqliteTable('user', {
  id: text('id').primaryKey(),
  email: text('email').unique().notNull(),

  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql`(strftime('%s', 'now'))`,
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(
    sql`(strftime('%s', 'now'))`,
  ),
})
