export
type I_model = 'deepseek-chat' | 'deepseek-reasoner'

export
type I_finish_reason = 'stop' | 'length' | 'content_filter' | 'tool_calls' | 'insufficient_system_resource'

export
interface I_response_choice {
	finish_reason: I_finish_reason
	index: 0
	message: {
		content: string
		reasoning_content?: string
		role: 'assistant'
	}
}

export
interface I_response_usage {
	prompt_tokens: number
	completion_tokens: number
	total_tokens: number
	prompt_tokens_details: {
		cached_tokens: number
	}
	completion_tokens_details?: {
		reasoning_tokens: number
	}
	prompt_cache_hit_tokens: number
	prompt_cache_miss_tokens: number
}

export
interface I_response_data {
	id: string
	object: 'chat.completion'
	created: number
	model: I_model
	system_fingerprint: string

	choices: [I_response_choice]
	usage: I_response_usage
}
