import Database from 'better-sqlite3'
import { SqliteDialect } from 'kysely'
import { SqliteBuilder } from 'kysely-sqlite-builder'
import { type DB } from './tables'

const sqlite = new Database('data.db')

export const db = new SqliteBuilder<DB>({
  dialect: new SqliteDialect({
    database: sqlite,
  }),
})
