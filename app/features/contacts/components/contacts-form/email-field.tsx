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
import { emailLabels } from '../../constants'
import { type TContactsMultiValueSchema } from '../../schema'

interface EmailFieldProps
  extends FieldConfig<Array<TContactsMultiValueSchema>> {
  formRef: RefObject<HTMLFormElement>
}

export function EmailField({ formRef, ...emails }: EmailFieldProps) {
  const emailList = useFieldList<TContactsMultiValueSchema[]>(formRef, emails)

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Emails</div>

        <div>
          <Button {...list.insert(emails.name)} variant="link">
            + add email address
          </Button>
        </div>
      </div>

      {emailList.map((email, index) => (
        <EmailFieldset
          {...email}
          key={email.key}
          index={index}
          fieldName={emails.name}
        />
      ))}
    </div>
  )
}

interface EmailFieldsetProps extends FieldsetConfig<TContactsMultiValueSchema> {
  index: number
  fieldName: string
}

export function EmailFieldset({
  index,
  fieldName,
  ...config
}: EmailFieldsetProps) {
  const ref = useRef<HTMLFieldSetElement>(null)
  const { value, label } = useFieldset(ref, config)

  return (
    <fieldset className="grid grid-cols-12  gap-2 " ref={ref}>
      <div className="col-span-8">
        <FormItem errors={value.errors}>
          <FormLabel className="sr-only">email {index + 1}</FormLabel>
          <FormControl>
            <Input placeholder="email address" {...conform.input(value)} />
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
              {emailLabels.map(item => (
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
