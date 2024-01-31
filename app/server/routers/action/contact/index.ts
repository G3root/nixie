import { createTRPCRouter } from '~/server/trpc'
import { createContact } from './create-create'

export const contactAction = createTRPCRouter({
  create: createContact,
})
