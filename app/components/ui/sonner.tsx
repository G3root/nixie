import { useEffect } from 'react'
import { toast as showToast, Toaster as Sonner } from 'sonner'
import { type Toast } from '~/utils/toast.server'

type ToasterProps = React.ComponentProps<typeof Sonner>

export function useToast(toast?: Toast | null) {
  useEffect(() => {
    if (toast) {
      setTimeout(() => {
        showToast[toast.type](toast.title, {
          id: toast.id,
          description: toast.description,
        })
      }, 0)
    }
  }, [toast])
}

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
