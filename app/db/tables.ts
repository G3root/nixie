import { type InferDatabase } from 'kysely-sqlite-builder/schema'
import { contactTable } from './schema/contact'
import { emailTable } from './schema/email'
import { totpTable } from './schema/totp'
import { userTable } from './schema/user'

export const baseTables = {
  user: userTable,
  totp: totpTable,
  contact: contactTable,
  email: emailTable,
}

// infer type from baseTables
export type DB = InferDatabase<typeof baseTables>
