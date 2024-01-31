import { type TCreateContactSchema } from '~/features/contacts/schema'
import { dummyInputParser, protectedProcedure } from '~/server/trpc'
import { newId } from '~/utils/id'

export const createContact = protectedProcedure
  .input(dummyInputParser<TCreateContactSchema>())
  .mutation(async ({ ctx, input }) => {
    const { user, db } = ctx
    const { email, ...rest } = input

    const contact = await db.kysely
      .insertInto('contact')
      .values({
        id: newId('contact'),
        ownerId: user.id,
        ...rest,
      })
      .returning('id')
      .executeTakeFirstOrThrow()

    if (email.length) {
      await db.kysely
        .insertInto('email')
        .values(
          email.map(item => ({
            id: newId('email'),
            contactId: contact.id,
            ...item,
          })),
        )
        .execute()
    }

    return { success: true }
  })
