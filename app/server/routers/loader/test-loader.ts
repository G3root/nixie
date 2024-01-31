import { publicProcedure } from '~/server/trpc'

export const testLoader = publicProcedure.mutation(async ctx => {
  return { message: 'hello world from loader' }
})
