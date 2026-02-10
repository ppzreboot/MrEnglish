export
interface I_llm_config {
	base_url: string
	api_key: string
	model: string
}

export
interface I_chat_msg {
	role: 'system' | 'user' | 'assistant'
	content: string
}
