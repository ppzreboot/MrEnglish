import { I_auth_provider_key } from '#service/auth'
import { db } from '#service/db'

export
const user_service = {
	async retrieve_by_provider(provider_user: {
		provider: I_auth_provider_key
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
}
