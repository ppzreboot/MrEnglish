import { I_app_env } from '@mr-english/app-model'
import { is_real_string } from '../utils/type-checker.ts'

export
function read_env(): I_app_env {
    const app_mode = Deno.env.get('app_mode')
    if (app_mode !== 'development' && app_mode !== 'production')
        throw Error('ENV Error: app_mode - ' + app_mode)

    const raw_port = Deno.env.get('port')
    const port = Number(raw_port)
    if (port < 8000 && port > 20000)
        throw Error('ENV Error: port - ' + raw_port)

    const raw_session_duration_d = Deno.env.get('session_duration_d')
    const session_duration_d = Number(raw_session_duration_d)
    if (session_duration_d < 0.1 || session_duration_d > 365)
        throw Error('ENV Error: session_duration_d - ' + raw_session_duration_d)
    const session_duration_ms = session_duration_d * 24 * 60 * 60 * 1000

    const github_oauth_client_id = Deno.env.get('github_oauth_client_id')
    if (!is_real_string(github_oauth_client_id))
        throw Error('ENV Error: github_oauth_client_id - ' + github_oauth_client_id)
    const github_oauth_client_secret = Deno.env.get('github_oauth_client_secret')
    if (!is_real_string(github_oauth_client_secret))
        throw Error('ENV Error: github_oauth_client_secret - ' + github_oauth_client_secret)

    const mongo_db_name = Deno.env.get('mongo_db_name')
    if (!is_real_string(mongo_db_name))
        throw Error('ENV Error: mongo_db_name - ' + mongo_db_name)
    const mongo_db_uri = Deno.env.get('mongo_db_uri')
    if (!is_real_string(mongo_db_uri))
        throw Error('ENV Error: mongo_db_uri - ' + mongo_db_uri)

    const ecdict_sqlite3 = Deno.env.get('ecdict_sqlite3')
    if (!is_real_string(ecdict_sqlite3))
        throw Error('ENV Error: ecdict_sqlite3 - ' + ecdict_sqlite3)
    const mw_cache_mongo_uri = Deno.env.get('mw_cache_mongo_uri')
    if (!is_real_string(mw_cache_mongo_uri))
        throw Error('ENV Error: mw_cache_mongo_uri - ' + mw_cache_mongo_uri)
    const mw_apikey = Deno.env.get('mw_apikey')
    if (!is_real_string(mw_apikey))
        throw Error('ENV Error: mw_apikey - ' + mw_apikey)

    return {
        app_mode,
        port,
        session_duration_ms,

        github_oauth_client_id,
        github_oauth_client_secret,

        mongo_db_name,
        mongo_db_uri,

        ecdict_sqlite3,
        mw_cache_mongo_uri,
        mw_apikey,
    }
}
