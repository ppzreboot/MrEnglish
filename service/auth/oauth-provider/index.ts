import { github_provider } from './github'
import type { I_auth_provider, I_auth_provider_key } from './type'

export * from './type'

const providers: Record<I_auth_provider_key, I_auth_provider> = {
	github: github_provider,
}

export
function get_auth_provider(key: I_auth_provider_key) {
	return providers[key]
}
