import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from '@remix-run/node'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '~/server/root'
import { createTRPCContext } from '~/server/trpc'

const handleRequest = (args: LoaderFunctionArgs | ActionFunctionArgs) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: args.request,
    router: appRouter,
    createContext: () => createTRPCContext({ request: args.request }),
    onError:
      process.env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`,
            )
          }
        : undefined,
  })
}

export const loader = async (args: LoaderFunctionArgs) => {
  return handleRequest(args)
}

export const action = async (args: ActionFunctionArgs) => {
  return handleRequest(args)
}
