import { type InferDatabase } from 'kysely-sqlite-builder/schema'
import { totpTable } from './schema/totp'
import { userTable } from './schema/user'

export const baseTables = {
  user: userTable,
  totp: totpTable,
}

// infer type from baseTables
export type DB = InferDatabase<typeof baseTables>
