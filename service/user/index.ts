import { I_oauth2_provider_key } from '#service/auth/oauth2'
import { db } from '#service/db'

export
const user_service = {
	async retrieve_by_provider(provider_user: {
		provider: I_oauth2_provider_key
		provider_id: string
	}) {
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
			where: { email },
		})
	},

	async set_email(user_id: string, email: string) {
		const normalized = email.trim().toLowerCase()
		await db.user.update({
			where: { id: user_id },
			data: { email: normalized },
		})
	},
}
