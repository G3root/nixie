import { createContext, forwardRef, useContext, useId } from 'react'
import type * as LabelPrimitive from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '~/utils/misc'
import { Label } from './ui/label'

export type ListOfErrors = Array<string | null | undefined> | null | undefined

export function ErrorList({ errors }: { errors?: ListOfErrors }) {
  const { formDescriptionId } = useFormField()
  const errorsToRender = errors?.filter(Boolean)
  if (!errorsToRender?.length) return null

  return (
    <ul id={formDescriptionId} className="flex flex-col gap-1">
      {errorsToRender.map(e => (
        <li key={e} className="text-[0.7rem] font-medium text-destructive">
          {e}
        </li>
      ))}
    </ul>
  )
}

const useFormField = () => {
  const itemContext = useContext(FormItemContext)

  const { id, isErrored, errors } = itemContext

  return {
    id,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    isErrored,
    errors,
  }
}

type FormItemContextValue = {
  id: string
  isErrored: boolean
  errors: ListOfErrors
}

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
)

export const FormItem = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    errors?: ListOfErrors
  }
>(({ className, errors, ...props }, ref) => {
  const id = useId()

  const isErrored = errors?.length ? true : false
  return (
    <FormItemContext.Provider value={{ id, isErrored, errors }}>
      <div ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = 'FormItem'

export const FormLabel = forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { formItemId, isErrored } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(isErrored && 'text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = 'FormLabel'

export const FormMessage = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children }, ref) => {
  const { errors } = useFormField()

  return (
    <div className="px-4 pb-3 pt-1">
      <ErrorList errors={errors} />
    </div>
  )
})
FormMessage.displayName = 'FormMessage'

export const FormControl = forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { isErrored, formItemId, formDescriptionId, formMessageId } =
    useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !isErrored
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={isErrored}
      {...props}
    />
  )
})
FormControl.displayName = 'FormControl'
