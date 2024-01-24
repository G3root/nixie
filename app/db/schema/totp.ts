import { sql } from 'drizzle-orm'
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const totp = sqliteTable(
  'totp',
  {
    id: text('id').primaryKey(),
    hash: text('hash').unique(),
    attempts: integer('attempts').default(0),
    active: integer('active', { mode: 'boolean' }),
    expiresAt: integer('expires_at', { mode: 'timestamp' }),

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
