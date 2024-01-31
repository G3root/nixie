import { Authenticator } from 'remix-auth'
import { TOTPStrategy } from 'remix-auth-totp'
import { db } from '~/db'
import { newId } from '~/utils/id'
import { authSessionStorage } from './auth-session.server'

export const authenticator = new Authenticator<{
  id: string
  email: string
}>(authSessionStorage, {
  throwOnError: true,
})

/**
 * TOTP - Strategy.
 */
authenticator.use(
  new TOTPStrategy(
    {
      secret: process.env.ENCRYPTION_SECRET,
      magicLinkGeneration: { callbackPath: '/magic-link' },

      createTOTP: async (data, expiresAt) => {
        await db.kysely
          .insertInto('totp')
          .values({
            id: newId('totp'),
            expiresAt: new Date(expiresAt),
            ...data,
          })
          .execute()
        try {
          // Delete expired TOTP records (Optional).

          await db.kysely
            .deleteFrom('totp')
            .where('expiresAt', '<', new Date())
            .execute()
        } catch (error) {
          console.warn('Error deleting expired TOTP records', error)
        }
      },
      readTOTP: async hash => {
        // Get the TOTP data from the database.
        const data = await db.kysely
          .selectFrom('totp')
          .where('hash', '==', hash)
          .select(['hash', 'active', 'attempts'])
          .executeTakeFirstOrThrow()

        console.log({ data })

        return await db.kysely
          .selectFrom('totp')
          .where('hash', '==', hash)
          .select(['hash', 'active', 'attempts'])
          .executeTakeFirstOrThrow()
      },
      updateTOTP: async (hash, data, expiresAt) => {
        // Update the TOTP data in the database.

        await db.kysely
          .updateTable('totp')
          .where('hash', '==', hash)
          .set(data)
          .execute()
      },
      sendTOTP: async ({ email, code, magicLink }) => {
        console.log({ email, code, magicLink })
      },
    },
    async ({ email }) => {
      let user = await db.kysely
        .selectFrom('user')
        .where('email', '==', email)
        .select(['email', 'id'])
        .executeTakeFirst()

      if (!user) {
        user = await db.kysely
          .insertInto('user')
          .values({ email, id: newId('user') })
          .returning(['email', 'id'])
          .executeTakeFirst()
        if (!user) throw new Error('Whoops! Unable to create user.')
      }

      return user
    },
  ),
)

export const withSession = (request: Request) =>
  authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })
