import { sql } from 'drizzle-orm'
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const totp = sqliteTable(
  'totp',
  {
    id: text('id').primaryKey(),
    hash: text('hash').unique().notNull(),
    attempts: integer('attempts').default(0).notNull(),
    active: integer('active', { mode: 'boolean' }).notNull(),
    expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),

    createdAt: integer('created_at', { mode: 'timestamp' }).default(
      sql`(strftime('%s', 'now'))`,
    ),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).default(
      sql`(strftime('%s', 'now'))`,
    ),
  },
  totp => ({
    expiresAtIdx: index('expiresAtIdx').on(totp.expiresAt),
  }),
)
