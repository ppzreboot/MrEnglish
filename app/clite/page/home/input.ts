import { h, text, app } from 'hyperapp'

export
const main_input = () => {
	interface I_state {
		last_word: string
		current_input: string
	}

	const root_node = document.querySelector('.main-input') as HTMLDivElement
	const last_word = root_node.dataset.word!
	return app<I_state>({
		node: root_node,
		init: () => ({
			last_word,
			current_input: last_word,
		}),
		view: state =>
			h('div', {}, [
				h('input', {
					class: 'en-font',
					value: state.current_input,
					autofocus: !last_word,
					placeholder: '输入单词',
					oninput: (s, evt) => ({
						...s,
						current_input: (evt.target as HTMLInputElement).value,
					}),
					onkeydown: (s, evt) => {
						const q = state.current_input.trim()
						if (evt.key === 'Enter' && q.length)
							location.href = '/?q=' + q
						return s
					},
				})
			])
		,
	})
}