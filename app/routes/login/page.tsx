import {
  type ActionFunctionArgs,
  json,
  type LoaderFunctionArgs,
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
    // The `successRedirect` route will be used to verify the OTP code.
    // This could be the current pathname or any other route that renders the verification form.
    successRedirect: '/verify',

    // The `failureRedirect` route will be used to render any possible error.
    // If not provided, ErrorBoundary will be rendered instead.
    failureRedirect: currentPath,
  })
}

export default function Login() {
  const { authEmail, authError } = useLoaderData<typeof loader>()

  return (
    <div className="mx-auto flex h-screen w-screen max-w-7xl flex-col px-6">
      <div className="mx-auto flex h-full w-full max-w-[350px] flex-col items-center justify-center gap-6">
        <div className="flex w-full flex-col items-center gap-6">
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <h1 className="text-center text-2xl font-semibold tracking-tight">
                Welcome back
              </h1>
              <p className="text-muted-foreground text-center text-base font-normal ">
                Log in or sign in to your account
              </p>
            </div>
          </div>

          <Form
            method="POST"
            autoComplete="off"
            className="flex w-full flex-col gap-2"
          >
            <div className="flex flex-col">
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <Input
                type="email"
                name="email"
                defaultValue={authEmail ? authEmail : ''}
                placeholder="name@example.com"
                required
              />
            </div>
            <Button type="submit">Continue with Email</Button>
          </Form>
        </div>

        {/* Errors Handling. */}
        {!authEmail && authError && (
          <span className="font-semibold text-red-400">
            {authError.message}
          </span>
        )}
      </div>
    </div>
  )
}
