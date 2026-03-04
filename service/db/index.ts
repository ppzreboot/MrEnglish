import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/prisma/client'
import { app_env } from '#service/env'

const adapter = new PrismaPg({
	connectionString: app_env.Database_URL,
})

export
const db = new PrismaClient({ adapter })
