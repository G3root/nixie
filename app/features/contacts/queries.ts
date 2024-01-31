import { db } from '~/db'

export const getContactsByOwner = (ownerId: string) => {
  return db.kysely
    .selectFrom('contact')
    .where('ownerId', '==', ownerId)
    .selectAll()
    .execute()
}
