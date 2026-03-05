import { I_oauth2_provider_key } from '#service/auth'
import { db } from '#service/db'
import { hash_password, verify_password } from '#service/password'

export
const user_service = {
	async retrieve_by_provider(provider_user: {
		provider: I_oauth2_provider_key
		provider_id: string
	}) {
		// 1. 尝试找到现有的 identity
		const identity = await db.identity.findUnique({
			where: {
				provider_provider_id: provider_user,
			},
			include: {
				user: true,
			},
		})

		if (identity)
			return identity.user

		// 2. 如果不存在，创建新用户和 identity
		// 注意：这里没有处理“关联现有账户”的逻辑，默认每个新 provider_id 都是新用户
		// 如果需要关联，需要先登录再绑定
		console.log('create a new user')
		const user = await db.user.create({
			data: {
				identities: {
					create: provider_user,
				},
			},
		})

		return user
	},

	async get_by_id(id: string) {
		return db.user.findUnique({
			where: { id },
		})
	},

	async get_by_email(email: string) {
		return db.user.findUnique({
			where: { email: email.trim().toLowerCase() },
		})
	},

	async set_email_password(user_id: string, email: string, password: string) {
		const normalized = email.trim().toLowerCase()
		const hashed = await hash_password(password)
		await db.user.update({
			where: { id: user_id },
			data: { email: normalized, password_hash: hashed },
		})
	},

	async verify_email_password(email: string, password: string) {
		const user = await db.user.findUnique({
			where: { email: email.trim().toLowerCase() },
		})
		if (!user?.password_hash) return null
		const ok = await verify_password(password, user.password_hash)
		return ok ? user : null
	},
}
