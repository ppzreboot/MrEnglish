import { randomUUID } from 'node:crypto'
import { db } from '#service/db'

const MAX_DEVICES = 3

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

	async get(token: string) {
		const session = await db.session.findUnique({
			where: { token },
		})
		
		if (!session)
			return undefined
		
		return {
			token: session.token,
			user_id: session.user_id,
			created_at: session.create_at.getTime(),
		}
	},

	async delete(token: string) {
		try {
			await db.session.delete({
				where: { token },
			})
		} catch (error) {
			// session 不存在，忽略
		}
	},
}
