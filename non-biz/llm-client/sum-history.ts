import { summarize_sys_prompt, summarize_user_prompt } from './prompt.ts'
import type { I_llm_config, I_chat_msg } from './type.ts'

export
async function summarize_history(
	config: I_llm_config,
	msgs: I_chat_msg[],
): Promise<string> {
	if (msgs.length === 0)
		throw Error('No messages to summarize')

	const res = await fetch(`${config.base_url}/chat/completions`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${config.api_key}`,
		},
		body: JSON.stringify({
			model: config.model,
			messages: [
				{ role: 'system', content: summarize_sys_prompt },
				{ role: 'user', content: summarize_user_prompt(msgs) },
			],
			stream: false,
		}),
	})

	if (!res.ok) {
		const text = await res.text()
		throw new Error(`Summarize API Error: ${res.status} ${res.statusText}\n${text}`)
	}

	const json = await res.json()
	return json.choices![0]!.message!.content
}