import type { I_request_config, I_chat_msg, I_stream_response_item } from './type'

export
async function* stream_chat(
	config: I_request_config,
	msg_list: I_chat_msg[],
	signal?: AbortSignal,
): AsyncGenerator<I_stream_response_item, void, void> {
	const res = await fetch(`https://api.deepseek.com/chat/completions`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${config.api_key}`,
		},
		body: JSON.stringify({
			model: config.think ? 'deepseek-reasoner' : 'deepseek-chat',
			messages: msg_list,
			max_tokens: config.max_tokens,
			stream: true,
			stream_options: {
				include_usage: true,
			},
		}),
		signal,
	})

	// llm 主动响应错误
	if (!res.ok) {
		const text = await res.text()
		throw new Error(`deepseek API Error: ${res.status} ${res.statusText}\n${text}`)
	}
	// unexpected `no body`
	if (!res.body)
		throw new Error('No response body')

	const decoder = new TextDecoder()
	let buffer = '' // 保留最后一行(可能还没传完)
	// SSE 事件以 \n\n 结束，不会导致 buffer 丢失最后一行
	for await (const chunk of (res.body as any)) {
		buffer += decoder.decode(chunk, { stream: true })
		const lines = buffer.split('\n')
		buffer = lines.pop() || ''

		for (const line of lines) {
			const trimmed = line.trim()
			if (trimmed === '')
				continue
			if (!trimmed.startsWith('data: '))
				throw new Error(`Unexpected SSE line: ${trimmed}`)

			const str_data = trimmed.slice(6)
			if (str_data === '[DONE]')
				return

			yield JSON.parse(str_data)
		}
	}
}
