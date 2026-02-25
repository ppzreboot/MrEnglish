import type { I_app_env, I_app_service } from '@biz/s/schema'
import type { I_route } from '@biz/s/router'
import { pages } from '@biz/common/page'

import { init_service__mongo_db } from '../service/db.ts'
import { init_service__session_maker } from '../service/session.ts'
import { init_service__auth } from '../service/auth.ts'
import { init_service__word_mng } from '../service/word.ts'
import { init_service__lookup } from '../service/lookup/mod.ts'
import { init_service__llm_trans } from '../service/llm-trans/mod.ts'

import { login_controller } from '../controller/login/index.ts'
import { github_login_controller } from '../controller/login/github.ts'
import { home_controller, star_controller } from '../controller/home.ts'
import { voc_list_controller, vocabulary_controller } from '../controller/vocabulary.ts'
import { setting_controller } from '../controller/setting.ts'
import { logout_controller } from '../controller/login/logout.ts'
import {
    controller__new_chat,
    controller__new_chat_page,
    controller__trans_page,
    controller__new_msg,
} from '../controller/llm-trans/mod.ts'

export
async function init(env: I_app_env): Promise<{
    service: I_app_service
    route_list: I_route<I_app_service>[]
}> {
    const app_db = await init_service__mongo_db(env.mongo_db_uri, env.mongo_db_name)
    const session = init_service__session_maker(app_db, env.session_duration_ms)
    const llm_trans = init_service__llm_trans({
        app_db,
        deepseek_apikey: env.deepseek_apikey,
    })
    const auth = init_service__auth(app_db)
    const lookup = await init_service__lookup({
        ecdict_sqlite3: env.ecdict_sqlite3,
        mw_cache_mongo_uri: env.mw_cache_mongo_uri,
        mw_apikey: env.mw_apikey,
    })
    const word = init_service__word_mng(app_db, lookup)
    const route_list: I_route<I_app_service>[] = [
        ['GET' , '/login', login_controller],
        ['GET' , '/login/github', github_login_controller],
        ['GET' , '/logout', logout_controller],

        ['GET' , pages.home.path, home_controller],
        ['GET' , pages.vocabulary.path, vocabulary_controller],
        ['GET' , pages.setting.path, setting_controller],

        ['GET' , '/api/star', star_controller],
        ['POST', '/api/vocabulary', voc_list_controller],

        ['GET' , pages.trans.path, controller__trans_page],
        ['GET' , pages.trans_new.path, controller__new_chat_page],
        ['POST', '/api/chat', controller__new_chat],
        ['POST', '/api/chat/msg', controller__new_msg],
    ]

    return {
        route_list,
        service: {
            env,
            session,
            llm_trans,
            auth,
            word,
            lookup,
        },
    }
}
