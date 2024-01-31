import { contact } from './routers/action/contact'
import { testLoader } from './routers/loader/test-loader'
import { createTRPCRouter } from './trpc'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  action: createTRPCRouter({
    contact,
  }),
  loader: createTRPCRouter({
    testLoader,
  }),
})

// export type definition of API
export type AppRouter = typeof appRouter
