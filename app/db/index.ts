import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { type Kyselify } from 'drizzle-orm/kysely'
import { CamelCasePlugin, Kysely, SqliteDialect } from 'kysely'
import type { CamelCasedProperties } from 'type-fest'
import { type totp, type user } from './schema'

interface Database {
  totp: CamelCasedProperties<Kyselify<typeof totp>>
  user: CamelCasedProperties<Kyselify<typeof user>>
}

const sqlite = new Database('data.db')
export const drzldb = drizzle(sqlite)

export const db = new Kysely<Database>({
  dialect: new SqliteDialect({
    database: sqlite,
  }),
  plugins: [new CamelCasePlugin()],
})
