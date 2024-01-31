import { customAlphabet } from 'nanoid'

const customIdChar = customAlphabet(
  '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
)

const prefixes = {
  user: 'usr',
  totp: 'totp',
  contact: 'cont',
  email: 'email',
  test: 'test', // for tests only
} as const

export function newId(prefix: keyof typeof prefixes) {
  return `${prefixes[prefix]}_${customIdChar(18)}`
}
