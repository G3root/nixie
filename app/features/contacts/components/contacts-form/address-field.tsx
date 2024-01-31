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
import { addressLabels } from '../../constants'
import { type TContactsMultiValueSchema } from '../../schema'

interface AddressFieldProps
  extends FieldConfig<Array<TContactsMultiValueSchema>> {
  formRef: RefObject<HTMLFormElement>
}

export function AddressField({ formRef, ...addresses }: AddressFieldProps) {
  const addressList = useFieldList<TContactsMultiValueSchema[]>(
    formRef,
    addresses,
  )

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Addresses</div>

        <div>
          <Button {...list.insert(addresses.name)} variant="link">
            + add address
          </Button>
        </div>
      </div>

      {addressList.map((address, index) => (
        <AddressFieldset
          {...address}
          key={address.key}
          index={index}
          fieldName={addresses.name}
        />
      ))}
    </div>
  )
}

interface AddressFieldsetProps
  extends FieldsetConfig<TContactsMultiValueSchema> {
  index: number
  fieldName: string
}

export function AddressFieldset({
  index,
  fieldName,
  ...config
}: AddressFieldsetProps) {
  const ref = useRef<HTMLFieldSetElement>(null)
  const { value, label } = useFieldset(ref, config)

  return (
    <fieldset className="grid grid-cols-12  gap-2 " ref={ref}>
      <div className="col-span-8">
        <FormItem errors={value.errors}>
          <FormLabel className="sr-only">address {index + 1}</FormLabel>
          <FormControl>
            <Input placeholder="address" {...conform.input(value)} />
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
              {addressLabels.map(item => (
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
