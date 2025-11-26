import { MongoClient } from 'mongodb'
import { I_app_db } from '@mr-english/app-model'

export
function init_service__mongo_db(connect_uri: string, db_name: string): I_app_db {
    const client = new MongoClient(connect_uri)
    const db = client.db(db_name)

    return {
        user: db.collection('user'),
        user_oauth: db.collection('user-oauth'),
        session: db.collection('session'),
        word: db.collection('word'),
    }
}
