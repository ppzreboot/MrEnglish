import { z } from 'zod'

export
const schema__api_output__auth_status = z.union([
	z.strictObject({ signed_in: z.literal(true) }),
	z.strictObject({
		signed_in: z.literal(false),
		github_oauth_client_id: z.string().min(1),
	})
])

export
type I_api_output__auth_status = z.infer<typeof schema__api_output__auth_status>
