import { defineTable } from 'kysely-sqlite-builder/schema'

export const userTable = defineTable(
  {
    id: { type: 'string', notNull: true },
    email: { type: 'string', notNull: true },
  },
  {
    primary: 'id',
    timeTrigger: { create: true, update: true },
    unique: ['email'],
  },
)
