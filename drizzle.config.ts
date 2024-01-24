import type { Config } from 'drizzle-kit'

export default {
  schema: './app/db/schema/index.ts',
  driver: 'better-sqlite',
  dbCredentials: {
    url: 'file:./data.db',
  },
  out: './drizzle',
} satisfies Config
