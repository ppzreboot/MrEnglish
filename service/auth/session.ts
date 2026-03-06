import { randomUUID } from 'node:crypto'
import { db } from '#service/db'
import { app_env } from '#service/env'
import { cookie_manager } from './cookie'

const MAX_DEVICES = 3
const session_duration = app_env.session_max_age * 1000

export
const session_manager = {
	async create(user_id: string): Promise<string> {
		const token = randomUUID()
		
		await db.$transaction(async (tx) => {
			const user_sessions = await tx.session.findMany({
				where: { user_id },
				orderBy: { create_at: 'asc' }, // 最早的在前
				select: { token: true },
			})

			if (user_sessions.length >= MAX_DEVICES) {
				const count_to_delete = user_sessions.length - MAX_DEVICES + 1
				if (count_to_delete > 0) {
					const tokens_to_delete = user_sessions
						.slice(0, count_to_delete)
						.map(s => s.token)
					
					await tx.session.deleteMany({
						where: {
							token: { in: tokens_to_delete },
						},
					})
				}
			}

			await tx.session.create({
				data: {
					token,
					user_id,
				},
			})
		})

		return token
	},

	async get() {
		const session_token = await cookie_manager.session_token.get()
		if (session_token === null)
			return null
		const session = await db.session.findUnique({
			where: { token: session_token },
		})
		if (session === null)
			return null

		const is_expired = Date.now() - session.create_at.getTime() > session_duration
		if (is_expired) {
			await db.session.deleteMany({
				where: { token: session_token },
			})
			return null
		}
		
		return {
			token: session.token,
			user_id: session.user_id,
		}
	},

	async delete(token: string) {
		await db.session.delete({
			where: { token },
		})
	},
}
