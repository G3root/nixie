import { type RefObject, useRef } from 'react'
import {
  conform,
  type FieldConfig,
  type FieldsetConfig,
  list,
  useFieldList,
  useFieldset,
} from '@conform-to/react'
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/forms'
import { Button } from '~/components/ui/button'
import { Icon } from '~/components/ui/icon'
import { Input } from '~/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { contactLabels } from '../../constants'
import { type TContactsMultiValueSchema } from '../../schema'

interface ContactFieldProps
  extends FieldConfig<Array<TContactsMultiValueSchema>> {
  formRef: RefObject<HTMLFormElement>
}

export function ContactField({ formRef, ...contacts }: ContactFieldProps) {
  const contactList = useFieldList<TContactsMultiValueSchema[]>(
    formRef,
    contacts,
  )

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Contacts</div>

        <div>
          <Button {...list.insert(contacts.name)} variant="link">
            + add contact
          </Button>
        </div>
      </div>

      {contactList.map((contact, index) => (
        <ContactFieldset
          {...contact}
          key={contact.key}
          index={index}
          fieldName={contacts.name}
        />
      ))}
    </div>
  )
}

interface ContactFieldsetProps
  extends FieldsetConfig<TContactsMultiValueSchema> {
  index: number
  fieldName: string
}

export function ContactFieldset({
  index,
  fieldName,
  ...config
}: ContactFieldsetProps) {
  const ref = useRef<HTMLFieldSetElement>(null)
  const { value, label } = useFieldset(ref, config)

  return (
    <fieldset className="grid grid-cols-12  gap-2 " ref={ref}>
      <div className="col-span-8">
        <FormItem errors={value.errors}>
          <FormLabel className="sr-only">contact {index + 1}</FormLabel>
          <FormControl>
            <Input
              placeholder="contact number"
              type="tel"
              {...conform.input(value)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </div>
      <div className="col-span-3">
        <FormItem errors={label.errors}>
          <FormLabel className="sr-only">Label</FormLabel>
          <Select name={label.name}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="label" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {contactLabels.map(item => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </div>

      <div className="col-span-1 flex justify-end pt-2">
        <Button
          {...list.remove(fieldName, { index })}
          size="icon"
          variant="destructive"
          aria-label="remove field "
        >
          <Icon name="trash-2" />
        </Button>
      </div>
    </fieldset>
  )
}
