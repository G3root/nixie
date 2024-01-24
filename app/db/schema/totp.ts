import { defineTable } from 'kysely-sqlite-builder/schema'

export const totpTable = defineTable(
  {
    id: { type: 'string', notNull: true },
    hash: { type: 'string', notNull: true },
    attempts: { type: 'int', notNull: true, defaultTo: 0 },
    active: { type: 'boolean', notNull: true },
    expiresAt: { type: 'date', notNull: true },
  },
  {
    primary: 'id',
    timeTrigger: { create: true, update: true },
    unique: ['hash'],
  },
)
