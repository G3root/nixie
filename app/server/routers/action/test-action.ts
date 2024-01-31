import { publicProcedure } from '~/server/trpc'

export const testAction = publicProcedure.mutation(async ({ ctx }) => {
  return { message: 'hello world from action' }
})
