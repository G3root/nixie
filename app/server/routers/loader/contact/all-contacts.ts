import { jsonArrayFrom } from 'kysely/helpers/sqlite'
import { protectedProcedure } from '~/server/trpc'

export const allContacts = protectedProcedure.query(async ({ ctx, input }) => {
  const { db, user } = ctx

  const data = await db.kysely
    .selectFrom('contact as c')
    .select(eb => [
      'id',
      jsonArrayFrom(
        eb
          .selectFrom('email as e')
          .select(['e.id', 'e.label', 'e.value'])
          .whereRef('e.contactId', '=', 'c.id'),
      ).as('email'),
    ])
    .where('ownerId', '==', user.id)
    .selectAll()
    .execute()

  return { data }
})
