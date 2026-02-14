import { $S, h, redraw } from '@biz/c/superfine'
import {
	SVG__collapse_menu,
	SVG__new_chat,
	SVG__temp_chat,
	type I_visible,
} from '@biz/c/ui2'
import { css } from 'goober'

export
function Menu(visible: I_visible) {
	return $Menu({}, [
		h('div', { className: 'top-btns' }, [
			h('button',
				{
					className: 'icon-btn',
					title: '新对话',
				},
				SVG__new_chat(),
			),
			h('button',
				{
					className: 'icon-btn',
					title: '临时对话 - 开发中...',
				},
				SVG__temp_chat(),
			),
			h('button',
				{
					className: 'icon-btn collapse-menu',
					title: '收起菜单',
					onclick() {
						visible.set(false)
						redraw()
					},
				},
				SVG__collapse_menu(),
			),
		])
	])
}

const $Menu = $S('div', css({
	'.top-btns': {
		display: 'flex',
		'.collapse-menu': {
			marginLeft: 'auto',
		},
	}
}))
