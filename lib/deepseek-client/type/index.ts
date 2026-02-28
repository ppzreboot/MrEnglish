export * from './deepseek'
export * from './stream'

export
interface I_request_config {
	api_key: string
	think: boolean
	max_tokens?: number
}

export
interface I_chat_msg {
	role: 'system' | 'user' | 'assistant'
	content: string
}
