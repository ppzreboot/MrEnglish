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
		async new_chat(userid, title, char_setting) {
			const result = await opts.app_db.llm_trans_chat.insertOne({
				userid,
				title,
				system_prompt: char_setting,
				create_at: new Date(),
			})
			return result.insertedId
		},
		async *new_msg(chat, msg) {
			const chat_id_str = chat._id.toString()
			if (unfinished_chat.has(chat_id_str))
				// 先暂时不处理这个异常
				// 前端直接报错，提示“请刷新页面后重试”
				throw new Error(`chat ${chat_id_str} 有未完成的对话`)
			unfinished_chat.set(chat_id_str, new Date())
			try {
				const llm_stream = new_msg(opts.app_db, opts.deepseek_apikey, chat, msg)
				for await (const delta_msg of llm_stream)
					yield delta_msg
			} catch(err) {
				throw err
			} finally {
				unfinished_chat.delete(chat_id_str)
			}
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

	/* 1. 组装 messages */
	const history_list = await app_db.llm_trans_chat_msg
		.find({ chat_id: chat._id })
		.sort({ create_at: 1 })
		.limit(6)
		.toArray()
	const history_msg_list = history_list.map<I_chat_msg[]>(msg => [
		{ role: 'user', content: msg.user_msg },
		{ role: 'assistant', content: msg.raw_response.choices[0].message.content },
	])
	const msg_list: I_chat_msg[] = [
		{ role: 'system', content: chat.system_prompt },
		...history_msg_list.flat(),
		{ role: 'user', content: msg },
	]
	console.debug('msg list', msg_list)

	/* 2. 发送请求 */
	const response = stream_chat(
		{
			api_key,
			think: false,
			max_tokens: 4096, // max_tokens: [1, 8192]
		},
		msg_list,
	)

	/* 3. 处理响应 */
	let assistant_msg = ''
	let finished = false
	for await (const stream_item of response) {
		if (finished)
			throw Error('receiving after finished')
		if (stream_item.usage === null) {
			// 1. 处理 delta content
			const d_content = stream_item.choices[0].delta.content!
			yield d_content
			assistant_msg += d_content
		} else {
			// 2. 处理 finish
			finished = true
			const choice = stream_item.choices[0]
			await app_db.llm_trans_chat_msg.insertOne({
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
		}
	}
}
