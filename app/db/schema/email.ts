import { defineLiteral, defineTable } from 'kysely-sqlite-builder/schema'
import { type TEmailLabel } from '~/features/contacts/types'

export const emailTable = defineTable(
  {
    id: { type: 'string', notNull: true },

    label: defineLiteral<TEmailLabel>(),
    value: { type: 'string', notNull: true },

    contactId: { type: 'string' },
  },
  {
    primary: 'id',
    timeTrigger: { create: true, update: true },
    index: ['contactId'],
  },
)
