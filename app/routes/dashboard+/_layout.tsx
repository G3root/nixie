import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { authenticator } from '~/features/auth/auth.server'
import { SideBar } from '~/features/dashboard/sidebar'

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  return json({})
}

export default function DashboardLayout() {
  return (
    <div className="flex">
      <aside className="sticky top-0 hidden h-screen w-64 flex-shrink-0 flex-col lg:flex ">
        <SideBar />
      </aside>
      <div className="flex flex-grow flex-col lg:border-l">
        <div className="px-4 py-6 lg:px-8 2xl:mx-auto 2xl:max-w-screen-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
