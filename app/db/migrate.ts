import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { drzldb } from './index'

async function main() {
  console.log('Running migrations')

  migrate(drzldb, { migrationsFolder: 'drizzle' })

  console.log('Migrated successfully')

  process.exit(0)
}

main().catch(e => {
  console.error('Migration failed')
  console.error(e)
  process.exit(1)
})
