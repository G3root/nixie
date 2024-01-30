import { useForm } from '@conform-to/react'
import { getFieldsetConstraint, parse } from '@conform-to/zod'
import { type ActionFunctionArgs, json } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import { z } from 'zod'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Textarea } from '~/components/ui/textarea'
import { RELATION_TYPES } from '~/features/contacts/constants'

const schema = z.object({
  name: z.string().min(1),
  birthday: z.string().optional(),
  notes: z.string().optional(),
  relation: z.enum(RELATION_TYPES),
})

const formId = 'create-contact'

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()

  const submission = parse(formData, { schema })

  if (!submission.value || submission.intent !== 'submit') {
    return json(submission)
  }

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

            <FormItem errors={fields.birthday.errors}>
              <FormLabel>Birthday</FormLabel>
              <FormControl>
                <Input name={fields.birthday.name} type="date" />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem errors={fields.relation.errors}>
              <FormLabel>Relation</FormLabel>
              <Select name={fields.relation.name}>
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {RELATION_TYPES.map(item => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>

            <FormItem errors={fields.notes.errors}>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea name={fields.notes.name} />
              </FormControl>
              <FormMessage />
            </FormItem>
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
