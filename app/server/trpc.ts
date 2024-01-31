import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import { ZodError } from 'zod'
import { db } from '~/db'
import { authenticator } from '~/features/auth/auth.server'

export const createTRPCContext = async (ctx: { request: Request }) => {
  const user = await authenticator.isAuthenticated(ctx.request)
  return { ...ctx, db, user }
}

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

export function dummyInputParser<T>(): (input: unknown) => T {
  return input => input as T
}

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      user: { ...ctx.user },
    },
  })
})
export const createTRPCRouter = t.router

export const publicProcedure = t.procedure
