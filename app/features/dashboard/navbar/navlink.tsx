import { NavLink as RemixNavLink } from '@remix-run/react'
import clsx from 'clsx'

interface NavLinkProps {
  label: string
  to: string
}

export function NavLink({ to, label }: NavLinkProps) {
  return (
    <RemixNavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          'hover:text-primary text-sm font-medium transition-colors',
          !isActive && 'text-muted-foreground',
        )
      }
    >
      {label}
    </RemixNavLink>
  )
}
