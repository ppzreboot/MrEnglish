import type { I_app_env, I_app_service } from '@mr-english-server/schema'
import type { I_route } from '@mr-english-server/router'

import { init_service__mongo_db } from '../service/db.ts'
import { init_service__session_maker } from '../service/session.ts'
import { init_service__sign_up_in } from '../service/sign-up-in.ts'
import { init_service__word_mng } from '../service/word.ts'

import { route__login } from '../handler/auth/oauth-login.ts'
import { route__auth_status } from '../handler/auth/status.ts'
import { route__lookup } from '../handler/word.ts'
import { init_service__lookup } from '../service/lookup/mod.ts'

export
async function init(env: I_app_env): Promise<{
    service: I_app_service
    route_list: I_route<I_app_service>[]
}> {
    const app_model = await init_service__mongo_db(env.mongo_db_uri, env.mongo_db_name)
    const session = init_service__session_maker(app_model, env.session_duration_ms)
    const sign_up_in = init_service__sign_up_in(app_model)
    const lookup = await init_service__lookup({
        ecdict_sqlite3: env.ecdict_sqlite3,
        mw_cache_mongo_uri: env.mw_cache_mongo_uri,
        mw_apikey: env.mw_apikey,
    })
    const word_mng = init_service__word_mng(app_model, lookup)

    return {
        service: {
            env,
            session,
            sign_up_in,
            word_mng,
            lookup,
        },
        route_list: [
            route__auth_status,
            route__login,
            route__lookup,
        ]
    }
}
