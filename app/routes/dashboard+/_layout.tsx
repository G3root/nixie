import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { authenticator } from '~/features/auth/auth.server'

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  return json({})
}

export default function DashboardLayout() {
  return <Outlet />
}
