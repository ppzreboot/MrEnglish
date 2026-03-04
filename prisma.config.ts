import { defineConfig } from 'prisma/config'
import { app_env } from './service/env'

export default defineConfig({
  schema: 'service/db/prisma/schema.prisma',
  migrations: {
    path: 'service/db/prisma/migrations',
  },
  datasource: {
    url: app_env.Database_URL,
  },
})
