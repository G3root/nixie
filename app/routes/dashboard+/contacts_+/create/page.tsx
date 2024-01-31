import { useForm } from '@conform-to/react'
import { getFieldsetConstraint, parse } from '@conform-to/zod'
import { type ActionFunctionArgs, json } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/forms'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { AddressField } from '~/features/contacts/components/contacts-form/address-field'
import { ContactField } from '~/features/contacts/components/contacts-form/contact-field'
import { EmailField } from '~/features/contacts/components/contacts-form/email-field'
import { SocialField } from '~/features/contacts/components/contacts-form/social-field'
import { createContactSchema } from '~/features/contacts/schema'
import { trpc } from '~/trpc/trpc.server'
import { redirectWithToast } from '~/utils/toast.server'

const schema = createContactSchema

const formId = 'create-contact'

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()

  const submission = parse(formData, { schema })

  if (!submission.value || submission.intent !== 'submit') {
    return json(submission)
  }

  try {
    await trpc({ request }).action.contact.create.mutate({
      ...submission.value,
    })

    return redirectWithToast('/dashboard/contacts', {
      title: 'contact created successfully',
      type: 'success',
      description: '',
    })
  } catch (error) {}

  return json(submission)
}

export default function CreateContactsPage() {
  const lastSubmission = useActionData<typeof action>()
  const [form, fields] = useForm({
    id: formId,
    constraint: getFieldsetConstraint(schema),
    lastSubmission,
    onValidate({ formData }) {
      return parse(formData, { schema })
    },
    shouldRevalidate: 'onBlur',
  })

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Create Contact</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="POST" {...form.props}>
            <FormItem errors={fields.name.errors}>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input name={fields.name.name} />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem errors={fields.job.errors}>
              <FormLabel>Job</FormLabel>
              <FormControl>
                <Input name={fields.job.name} />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem errors={fields.company.errors}>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input name={fields.company.name} />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem errors={fields.birthday.errors}>
              <FormLabel>Birthday</FormLabel>
              <FormControl>
                <Input name={fields.birthday.name} type="date" />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem errors={fields.notes.errors}>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea name={fields.notes.name} />
              </FormControl>
              <FormMessage />
            </FormItem>

            <AddressField {...fields.address} formRef={form.ref} />
            <EmailField {...fields.email} formRef={form.ref} />
            <ContactField {...fields.contact} formRef={form.ref} />
            <SocialField {...fields.social} formRef={form.ref} />
          </Form>
        </CardContent>
        <CardFooter className="justify-end">
          <Button type="submit" form={formId}>
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
