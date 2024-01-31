import { createTRPCRouter } from '~/server/trpc'
import { allContacts } from './all-contacts'

export const contactLoader = createTRPCRouter({
  all: allContacts,
})
