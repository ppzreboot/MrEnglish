import { MongoClient } from 'mongodb'
import type { I_lookup, I_session, I_user, I_user_oauth } from './type.ts'

export
type I_llm_key
    = 'grok-4-fast-reasoning'
    | 'grok-4-fast-non-reasoning'
    | 'grok-4-0709'

export
function init_service__mongo_db(connect_uri: string, db_name: string) {
    const client = new MongoClient(connect_uri)
    const db = client.db(db_name)

    return {
        user: db.collection<I_user>('user'),
        user_oauth: db.collection<I_user_oauth>('user-oauth'),
        session: db.collection<I_session>('session'),
        word: db.collection<I_lookup>('lookup'),
    }
}

export
type I_app_model = ReturnType<typeof init_service__mongo_db>
