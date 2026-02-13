import type { ObjectId, WithId } from 'mongodb'
import type { I_doc__chat, I_doc__chat_msg } from '@biz/common/entity'
import type { I_app_db, I_service__llm_trans, I_app_env } from '@biz/s/schema'
import { stream_chat, type I_stream_response_item, type I_chat_msg } from '@ppz/deepseek-client'

export
const init_service__llm_trans = (opts: {
	app_db: I_app_db
	deepseek_apikey: string
}): I_service__llm_trans => {
	const unfinished_chat = new Map<string, Date>()

	return {
		async own_chat(userid, chat_id) {
			const chat = await opts.app_db.llm_trans_chat.findOne({
				_id: chat_id,
				userid,
			})
			return chat
		},
		async *new_msg(chat, msg) {
			const chat_id_str = chat._id.toString()
			if (unfinished_chat.has(chat_id_str))
				throw new Error(`chat ${chat_id_str} 有未完成的对话`)
			unfinished_chat.set(chat_id_str, new Date())
			for await (const delta_msg of new_msg(opts.app_db, opts.deepseek_apikey, chat, msg))
				yield delta_msg
			unfinished_chat.delete(chat_id_str)
		},
	}
}

async function* new_msg(
	app_db: I_app_db,
	api_key: string,
	chat: WithId<I_doc__chat<ObjectId, Date>>,
	msg: string
): AsyncGenerator<string, void, void> {
	const create_at = new Date()

	const history_list = await app_db.llm_trans_chat_msg
		.find({ chat_id: chat._id })
		.sort({ create_at: 1 })
		.limit(20)
		.toArray()
	const conv_list = history_list.map<I_chat_msg[]>(msg => [
		{ role: 'user', content: msg.user_msg },
		{ role: 'assistant', content: msg.raw_response.choices[0].message.content },
	])
	const response = stream_chat(
		{
			api_key,
			think: false,
			// max_tokens: 10_000,
		},
		[
			{ role: 'system', content: chat.system_prompt },
			...conv_list.flat(),
			{ role: 'user', content: msg },
		],
	)
	let assistant_msg = ''
	let finished = false
	for await (const stream_item of response) {
		if (finished)
			throw Error('receiving after finished')
		if (stream_item.usage !== null) {
			finished = true
			const choice = stream_item.choices[0]
			app_db.llm_trans_chat_msg.insertOne({
				chat_id: chat._id,
				user_msg: msg,
				create_at,
				finish_at: new Date(),
				raw_response: {
					id: stream_item.id,
					object: stream_item.object,
					created: stream_item.created,
					model: stream_item.model,
					system_fingerprint: stream_item.system_fingerprint,
					usage: stream_item.usage,
					choices: [{
						index: 0,
						finish_reason: choice.finish_reason,
						message: {
							content: assistant_msg,
							role: 'assistant',
						},
					}],
				},
			})
		} else {
			const d_content = stream_item.choices[0].delta.content
			if (d_content === null)
				throw Error('non-reasoner model dont output "null content"')
			yield d_content
			assistant_msg += d_content
		}
	}
}
