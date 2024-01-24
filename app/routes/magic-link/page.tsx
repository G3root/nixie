import type { ActionFunctionArgs } from '@remix-run/node'
import { authenticator } from '~/features/auth/auth.server'

export async function loader({ request }: ActionFunctionArgs) {
  await authenticator.authenticate('TOTP', request, {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  })
}
