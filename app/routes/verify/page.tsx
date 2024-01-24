import {
  type ActionFunctionArgs,
  json,
  type LoaderFunctionArgs,
  redirect,
} from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { authenticator } from '~/features/auth/auth.server'
import { commitSession, getSession } from '~/features/auth/auth-session.server'

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    successRedirect: '/dashboard',
  })

  const cookie = await getSession(request.headers.get('cookie'))
  const authEmail = cookie.get('auth:email')
  const authError = cookie.get(authenticator.sessionErrorKey)

  if (!authEmail) return redirect('/login')

  // Commit session to clear any `flash` error message.
  return json({ authEmail, authError } as const, {
    headers: {
      'set-cookie': await commitSession(cookie),
    },
  })
}

export async function action({ request }: ActionFunctionArgs) {
  const url = new URL(request.url)
  const currentPath = url.pathname

  await authenticator.authenticate('TOTP', request, {
    successRedirect: currentPath,
    failureRedirect: currentPath,
  })
}

export default function Verify() {
  const { authEmail, authError } = useLoaderData<typeof loader>()

  return (
    <div className="mx-auto flex h-screen w-screen max-w-7xl flex-col px-6">
      <div className="mx-auto flex h-full w-full max-w-[350px] flex-col items-center justify-center gap-6">
        <div className="flex w-full flex-col items-center gap-6">
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <h1 className="text-2xl font-semibold tracking-tight">
                Please check your inbox
              </h1>
              <p className="text-muted-foreground text-center text-base font-normal">
                We've sent you a magic link email.
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-2">
            <Form
              method="POST"
              autoComplete="off"
              className="flex w-full flex-col gap-2"
            >
              <div className="flex flex-col">
                <label htmlFor="code" className="sr-only">
                  Code
                </label>
                <Input
                  type="text"
                  name="code"
                  placeholder="Enter code..."
                  required
                />
              </div>
              <Button type="submit">Continue</Button>
            </Form>

            {/* Request New Code. */}
            {/* Email is already in session, so no input it's required. */}
            <Form
              method="POST"
              autoComplete="off"
              className="flex w-full flex-col gap-2"
            >
              <Button variant="secondary" type="submit">
                Request New Code
              </Button>
            </Form>
          </div>
        </div>

        {/* Errors Handling. */}
        {authEmail && authError && (
          <span className="font-semibold text-red-400">
            {authError?.message}
          </span>
        )}
      </div>
    </div>
  )
}
