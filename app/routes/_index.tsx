import type { MetaFunction } from '@remix-run/node'
import { Icon } from '~/components/ui/icon'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
  return (
    <div>
      hello world <Icon name="x" />
    </div>
  )
}
