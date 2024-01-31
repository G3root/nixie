import { createTRPCRouter } from '~/server/trpc'
import { createContact } from './create-create'

export const contact = createTRPCRouter({
  create: createContact,
})
