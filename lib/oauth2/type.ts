export
interface I_auth_provider<K extends string> {
	key: K
	get_auth_url(state: string): Promise<string>
	get_user_info(code: string): Promise<string>
}
