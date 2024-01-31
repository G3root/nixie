import { type LoaderFunctionArgs } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { typedjson, useTypedLoaderData } from 'remix-typedjson'
import { buttonVariants } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { ContactsTable } from '~/features/contacts/components/contacts-table'
import { trpc } from '~/trpc/trpc.server'

export async function loader({ request }: LoaderFunctionArgs) {
  const data = await trpc({ request }).loader.contact.all.query()

  return typedjson(data)
}

export default function ContactsPage() {
  const data = useTypedLoaderData<typeof loader>()
  return (
    <div>
      <div className="flex items-center justify-between pb-8 pt-4">
        <h3 className="text-3xl font-bold tracking-tight">Contacts</h3>

        <Link to="create" className={buttonVariants()}>
          Create
        </Link>
      </div>

      <Separator />

      <ContactsTable data={data.data} />
    </div>
  )
}
