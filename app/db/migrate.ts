/* eslint-disable react-hooks/rules-of-hooks */

import { useSchema } from 'kysely-sqlite-builder/schema'
import { db } from '.'
import { baseTables } from './tables'

async function main() {
  await db.updateTableSchema(useSchema(baseTables))

  await db.destroy()
}

main()
