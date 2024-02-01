import { Link, useLocation } from '@remix-run/react'
import { buttonVariants } from '~/components/ui/button'
import { cn } from '~/utils/misc'

export function SideBar() {
  const { pathname } = useLocation()

  const NavLinks = [
    {
      label: 'Overview',
      to: '/dashboard',
      get active() {
        return pathname === this.to
      },
    },
    {
      label: 'Contacts',
      to: '/dashboard/contacts',
      get active() {
        return pathname.startsWith(this.to)
      },
    },
    {
      label: 'Tasks',
      to: '/dashboard/tasks',
      get active() {
        return pathname.startsWith(this.to)
      },
    },
    {
      label: 'Notes',
      to: '/dashboard/notes',
      get active() {
        return pathname.startsWith(this.to)
      },
    },
  ]

  return (
    <div className="pb-12">
      <div className="px-3 py-2">
        <div className="flex flex-col space-y-1">
          {NavLinks.map(item => (
            <Link
              key={item.label}
              to={item.to}
              className={cn(
                buttonVariants({
                  size: 'sm',
                  variant: item.active ? 'default' : 'ghost',
                }),
                'flex items-center justify-start',
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
