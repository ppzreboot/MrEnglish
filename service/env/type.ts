export
interface I_app_env {
	mode: 'dev' | 'pro'

	Database_URL: string

	ECDict_SQLITE3: string
	MW_apikey: string

	GitHub_client_id: string
	GitHub_client_secret: string

	session_max_age: number
	oauth2_state_max_age: number
}
