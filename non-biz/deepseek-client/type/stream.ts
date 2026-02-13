import type { I_model, I_finish_reason, I_response_usage } from './deepseek.ts'

export
interface I_stream_response_choice__reasoning {
	index: 0
	delta: {
		content: null
		reasoning_content: string
	}
	finish_reason: null
}

export
interface I_stream_response_choice__content {
	index: 0
	delta: {
		content: string
		reasoning_content: null
	}
	finish_reason: null
}

export
interface I_stream_response_choice__finish {
	index: 0
	delta: {
		content: ''
		reasoning_content: null
	}
	finish_reason: I_finish_reason
}

export
type I_stream_response_choice
	= I_stream_response_choice__reasoning
	| I_stream_response_choice__content
	| I_stream_response_choice__finish

export
interface I_stream_response_item__ongoing {
	id: string
	object: 'chat.completion'
	created: number
	model: I_model
	system_fingerprint: string

	choices: [I_stream_response_choice__reasoning | I_stream_response_choice__content]
}

export
interface I_stream_response_item__finished {
	id: string
	object: 'chat.completion'
	created: number
	model: I_model
	system_fingerprint: string

	choices: [I_stream_response_choice__finish]
	usage: I_response_usage
}

export
type I_stream_response_item
	= I_stream_response_item__ongoing
	| I_stream_response_item__finished
