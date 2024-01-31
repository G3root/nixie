import { defineObject, defineTable } from 'kysely-sqlite-builder/schema'
import {
  type TAddressSchema,
  type TContactSchema,
  type TSocialSchema,
} from '~/features/contacts/schema'

export const contactTable = defineTable(
  {
    id: { type: 'string', notNull: true },

    name: { type: 'string', notNull: true },
    birthday: { type: 'date' },
    contact: defineObject<TContactSchema>(),
    address: defineObject<TAddressSchema>(),

    job: { type: 'string' },
    company: { type: 'string' },
    notes: { type: 'string' },

    social: defineObject<TSocialSchema>(),

    //foreign key relation user
    ownerId: { type: 'string' },
  },
  {
    primary: 'id',
    timeTrigger: { create: true, update: true },
    index: ['ownerId'],
  },
)
