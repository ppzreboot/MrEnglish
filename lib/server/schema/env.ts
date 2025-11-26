export
interface I_app_env {
    app_mode: 'development' | 'production'
    port: number
    session_duration_ms: number

    // llm_base_url: string
    // llm_api_key: string

    github_oauth_client_id: string
    github_oauth_client_secret: string

    mongo_db_name: string
    mongo_db_uri: string

    ecdict_sqlite3: string
    mw_cache_mongo_uri: string
    mw_apikey: string
}