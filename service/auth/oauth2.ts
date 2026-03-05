import { make_github_provider } from '@ppz/oauth2/github'
import type { I_auth_provider } from '@ppz/oauth2'
import { app_env } from '#service/env'

export
type I_oauth2_provider_key = 'github'
export
function is_oauth2_provider_key(key: string): key is I_oauth2_provider_key {
	return key === 'github'
}

const providers: { [K in I_oauth2_provider_key]: I_auth_provider<K> } = {
	github: make_github_provider(app_env.GitHub_client_id, app_env.GitHub_client_secret),
}

export
function get_oauth2_provider(key: I_oauth2_provider_key) {
	return providers[key]
}
