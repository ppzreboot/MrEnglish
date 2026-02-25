import { $S, h, text, redraw } from '@biz/c/superfine'
import { page_state } from '../state.ts'
import { css } from 'goober'

export
function Chat() {
	return $Chat({}, [
		h('textarea', {
			value: page_state.current_chat.msg,
			oninput(e: InputEvent) {
				page_state.current_chat.msg = (e.target as HTMLTextAreaElement).value
				redraw()
			},
		})
	])
}

const $Chat = $S('div', css({

}))
