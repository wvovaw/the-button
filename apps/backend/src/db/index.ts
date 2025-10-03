import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema'

const url = Bun.env.DATABASE_FILENAME
if (!url)
  throw new Error('No DATABASE_FILENAME provided')

export default drizzle({
  connection: { url },
  schema,
})
