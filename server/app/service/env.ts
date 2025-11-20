import type { I_app_env } from '../type.ts'
import { app_env } from '../_env.ts'

export
function parse_app_env(): I_app_env {
    console.log('app env',
        app_env.app_mode,
        app_env.github_oauth_client_id,
        app_env.port,
        app_env.session_duration,
        app_env.llm_base_url,
    )
    return app_env
}
