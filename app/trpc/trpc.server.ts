import {
  createTRPCProxyClient,
  loggerLink,
  TRPCClientError,
} from '@trpc/client'
import { callProcedure } from '@trpc/server'
import { observable } from '@trpc/server/observable'
import { type TRPCErrorResponse } from '@trpc/server/rpc'
import { type AppRouter, appRouter } from '~/server/root'
import { createTRPCContext } from '~/server/trpc'
import { transformer } from './shared'

export const trpc = ({ request }: { request: Request }) => {
  return createTRPCProxyClient<AppRouter>({
    transformer,
    links: [
      loggerLink({
        enabled: op =>
          process.env.NODE_ENV === 'development' ||
          (op.direction === 'down' && op.result instanceof Error),
      }),

      () =>
        ({ op }) =>
          observable(observer => {
            createTRPCContext({ request })
              .then(ctx => {
                return callProcedure({
                  procedures: appRouter._def.procedures,
                  path: op.path,
                  rawInput: op.input,
                  ctx,
                  type: op.type,
                })
              })
              .then(data => {
                observer.next({ result: { data } })
                observer.complete()
              })
              .catch((cause: TRPCErrorResponse) => {
                observer.error(TRPCClientError.from(cause))
              })
          }),
    ],
  })
}
