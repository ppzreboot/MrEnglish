import { randomUUID } from 'node:crypto'

interface I_session {
	token: string
	user_id: string
	created_at: number
}

// 内存存储 Session
// Token -> Session
const sessions = new Map<string, I_session>()
// UserID -> Set<Token> (用于限制设备数量)
const user_tokens = new Map<string, Set<string>>()

const MAX_DEVICES = 3

export
const session_manager = {
	create(user_id: string): string {
		// check limit
		const tokens = (() => {
			const tokens = user_tokens.get(user_id)
			if (tokens === undefined) {
				const new_tokens = new Set<string>()
				user_tokens.set(user_id, new_tokens)
				return new_tokens
			}

			// 检查是否超过最大设备数
			if (tokens.size >= MAX_DEVICES) {
				let oldest_token: string | null = null
				let min_time = Infinity

				for (const t of tokens) {
					const s = sessions.get(t)!
					if (s.created_at < min_time) {
						min_time = s.created_at
						oldest_token = t
					}
				}

				sessions.delete(oldest_token!)
				tokens.delete(oldest_token!)
			}

			return tokens
		})()

		// 创建新 session
		const token = randomUUID()
		const session: I_session = {
			token,
			user_id,
			created_at: Date.now(),
		}
		sessions.set(token, session)
		tokens.add(token)

		return token
	},

	get(token: string) {
		return sessions.get(token)
	},

	delete(token: string) {
		const session = sessions.get(token)
		if (session) {
			sessions.delete(token)
			const tokens = user_tokens.get(session.user_id)!
			tokens.delete(token)
			if (tokens.size === 0)
				user_tokens.delete(session.user_id)
		}
	},
}
