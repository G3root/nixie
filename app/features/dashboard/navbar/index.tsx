import { NavLink } from './navlink'

const NavLinks = [
  {
    label: 'Overview',
    to: '/dashboard',
  },
  {
    label: 'Contacts',
    to: '/dashboard/contacts',
  },
  {
    label: 'Tasks',
    to: '/dashboard/tasks',
  },
  {
    label: 'Notes',
    to: '/dashboard/notes',
  },
]

export function Navbar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center overflow-auto px-4 ">
        <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
          {NavLinks.map(item => (
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            <NavLink key={item.label} {...item} />
          ))}
        </nav>
        <div className="ml-auto flex items-center space-x-4" />
      </div>
    </div>
  )
}
