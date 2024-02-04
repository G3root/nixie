import { z } from 'zod'
import {
  addressLabels,
  contactLabels,
  emailLabels,
  socialNetworkLabels,
} from './constants'

export const contactsMultiValueSchema = z.object({
  label: z.string(),
  value: z.string(),
})

export type TContactsMultiValueSchema = z.infer<typeof contactsMultiValueSchema>

export const addressSchema = z
  .array(
    z.object({
      label: z.enum(addressLabels),
      value: z.string(),
    }),
  )
  .min(0)

export type TAddressSchema = z.infer<typeof addressSchema>

export const emailSchema = z
  .array(
    z.object({
      label: z.enum(emailLabels),
      value: z.string(),
    }),
  )
  .min(0)

export type TEmailSchema = z.infer<typeof emailSchema>

export const contactSchema = z
  .array(
    z.object({
      label: z.enum(contactLabels),
      value: z.string(),
    }),
  )
  .min(0)

export type TContactSchema = z.infer<typeof contactSchema>

export const socialSchema = z
  .array(
    z.object({
      label: z.enum(socialNetworkLabels),
      value: z.string(),
    }),
  )
  .min(0)

export type TSocialSchema = z.infer<typeof socialSchema>

export const createContactSchema = z.object({
  name: z.string().min(1),
  birthday: z.coerce.date().optional(),
  notes: z.string().optional(),
  job: z.string().optional(),
  company: z.string().optional(),
  address: addressSchema,
  email: emailSchema,
  contact: contactSchema,
  social: socialSchema,
})

export type TCreateContactSchema = z.infer<typeof createContactSchema>
