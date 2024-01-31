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
import { socialNetworkLabels } from '../../constants'
import { type TContactsMultiValueSchema } from '../../schema'

interface SocialFieldProps
  extends FieldConfig<Array<TContactsMultiValueSchema>> {
  formRef: RefObject<HTMLFormElement>
}

export function SocialField({ formRef, ...socials }: SocialFieldProps) {
  const socialList = useFieldList<TContactsMultiValueSchema[]>(formRef, socials)

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Social Networks</div>

        <div>
          <Button {...list.insert(socials.name)} variant="link">
            + add social
          </Button>
        </div>
      </div>

      {socialList.map((social, index) => (
        <SocialFieldset
          {...social}
          key={social.key}
          index={index}
          fieldName={socials.name}
        />
      ))}
    </div>
  )
}

interface SocialFieldsetProps
  extends FieldsetConfig<TContactsMultiValueSchema> {
  index: number
  fieldName: string
}

export function SocialFieldset({
  index,
  fieldName,
  ...config
}: SocialFieldsetProps) {
  const ref = useRef<HTMLFieldSetElement>(null)
  const { value, label } = useFieldset(ref, config)

  return (
    <fieldset className="grid grid-cols-12  gap-2 " ref={ref}>
      <div className="col-span-8">
        <FormItem errors={value.errors}>
          <FormLabel className="sr-only">social account {index + 1}</FormLabel>
          <FormControl>
            <Input placeholder="social network url" {...conform.input(value)} />
          </FormControl>
          <FormMessage />
        </FormItem>
      </div>
      <div className="col-span-3">
        <FormItem errors={label.errors}>
          <FormLabel className="sr-only">Social network type</FormLabel>
          <Select name={label.name}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="network" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {socialNetworkLabels.map(item => (
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
