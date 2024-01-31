import './styles/tailwind.css'
import type { HeadersFunction, LoaderFunctionArgs } from '@remix-run/node'
import {
  json,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import { Toaster, useToast } from './components/ui/sonner'
import { getEnv } from './utils/env.server'
import { combineHeaders } from './utils/misc'
import { makeTimings } from './utils/timing.server'
import { getToast } from './utils/toast.server'

export async function loader({ request }: LoaderFunctionArgs) {
  const timings = makeTimings('root loader')

  const { toast, headers: toastHeaders } = await getToast(request)

  return json(
    {
      requestInfo: {
        path: new URL(request.url).pathname,
      },
      ENV: getEnv(),
      toast,
    },
    {
      headers: combineHeaders(
        { 'Server-Timing': timings.toString() },
        toastHeaders,
      ),
    },
  )
}

export const headers: HeadersFunction = ({ loaderHeaders }) => ({
  'Server-Timing': loaderHeaders.get('Server-Timing') ?? '',
})

export default function App() {
  const data = useLoaderData<typeof loader>()
  useToast(data.toast)
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-background text-foreground">
        <Outlet />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
      <Toaster />
    </html>
  )
}
