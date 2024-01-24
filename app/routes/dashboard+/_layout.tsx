import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { authenticator } from '~/features/auth/auth.server'
import { Navbar } from '~/features/dashboard/navbar'

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  return json({})
}

export default function DashboardLayout() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  )
}
