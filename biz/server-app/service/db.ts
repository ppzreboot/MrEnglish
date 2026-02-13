import { MongoClient } from 'mongodb'
import { I_app_db } from '@biz/s/schema'

export
async function init_service__mongo_db(connect_uri: string, db_name: string): Promise<I_app_db> {
	console.log('connecting to mongo db')
	const client = await new MongoClient(connect_uri).connect()
	console.log('connected to mongo db')
	const db = client.db(db_name)

	return {
		user: db.collection('user'),
		user_oauth: db.collection('user-oauth'),
		session: db.collection('session'),
		vocabulary: db.collection('vocabulary'),
		llm_trans_chat: db.collection('llm_trans_chat'),
		llm_trans_chat_msg: db.collection('llm_trans_chat_msg'),
	}
}
