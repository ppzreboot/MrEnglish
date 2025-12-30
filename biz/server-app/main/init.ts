import type { I_app_env, I_app_service } from '@biz/s/schema'
import type { I_route } from '@biz/s/router'

import { init_service__mongo_db } from '../service/db.ts'
import { init_service__session_maker } from '../service/session.ts'
import { init_service__sign_up_in } from '../service/sign-up-in.ts'
import { init_service__word_mng } from '../service/word.ts'
import { init_service__lookup } from '../service/lookup/mod.ts'

import { login_controller } from '../controller/login/index.ts'
import { github_login_controller } from '../controller/login/github.ts'
import { home_controller, star_controller } from '../controller/home.ts'
import { vocabulary_controller } from '../controller/vocabulary.ts'

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
    const word = init_service__word_mng(app_model, lookup)
    const route_list: I_route<I_app_service>[] = [
        ['GET' , '/', home_controller],
        ['GET' , '/api/star', star_controller],
        ['GET' , '/login', login_controller],
        ['GET' , '/login/github', github_login_controller],
        ['GET' , '/vocabulary', vocabulary_controller],
    ]

    return {
        route_list,
        service: {
            env,
            session,
            sign_up_in,
            word,
            lookup,
        },
    }
}
