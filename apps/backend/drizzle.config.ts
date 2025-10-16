import process from 'bun'
import { defineConfig } from 'drizzle-kit'

const url = process.env.DATABASE_FILENAME
if (!url)
  throw new Error('DATABASE_FILENAME is not defined')

export default defineConfig({
  out: './.drizzle',
  schema: './src/db/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url,
  },
})
