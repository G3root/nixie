import { contactAction } from './routers/action/contact'
import { contactLoader } from './routers/loader/contact'
import { createTRPCRouter } from './trpc'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  action: createTRPCRouter({
    contact: contactAction,
  }),
  loader: createTRPCRouter({
    contact: contactLoader,
  }),
})

// export type definition of API
export type AppRouter = typeof appRouter
