import { protectedProcedure } from '~/server/trpc'

export const allContacts = protectedProcedure.query(async ({ ctx, input }) => {
  const { db, user } = ctx

  const data = await db.kysely
    .selectFrom('contact')
    .where('ownerId', '==', user.id)
    .selectAll()
    .execute()

  return { data }
})
