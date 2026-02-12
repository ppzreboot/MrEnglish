import type { I_llm_config, I_chat_msg } from './type.ts'

export
async function* stream_chat(
	config: I_llm_config,
	messages: I_chat_msg[],
	signal?: AbortSignal,
): AsyncGenerator<string, void, void> {
	const res = await fetch(`${config.base_url}/chat/completions`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${config.api_key}`,
		},
		body: JSON.stringify({
			model: config.model,
			messages,
			stream: true,
		}),
		signal,
	})

	// llm 主动响应错误
	if (!res.ok) {
		const text = await res.text()
		throw new Error(`LLM API Error: ${res.status} ${res.statusText}\n${text}`)
	}

	// unexpected `no body`
	if (!res.body)
		throw new Error('No response body')

	try {
		const decoder = new TextDecoder()
		let buffer = '' // 保留最后一行(可能还没传完)
		for await (const chunk of res.body) {
			buffer += decoder.decode(chunk, { stream: true })
			const lines = buffer.split('\n')
			buffer = lines.pop() || ''

			for (const line of lines) {
				const trimmed = line.trim()
				if (!trimmed) continue
				if (!trimmed.startsWith('data: '))
					throw new Error(`Unexpected SSE line: ${trimmed}`)

				const data = trimmed.slice(6)
				if (data === '[DONE]')
					return

				yield JSON.parse(data)
					.choices![0]!.delta!.content
			}
		}
	} catch (err) {
		if (signal?.aborted)
			// Ignore abort errors, just stop
			return
		throw err
	}
}
