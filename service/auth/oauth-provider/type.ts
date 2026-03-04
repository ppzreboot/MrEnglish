export
type I_auth_provider_key = 'github'

export
interface I_auth_provider {
	key: I_auth_provider_key 
	get_auth_url(state: string): Promise<string>
	get_user_info(code: string): Promise<string>
}
