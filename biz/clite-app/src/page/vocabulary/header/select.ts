import { h, Children } from 'superfine'
import { css } from 'goober'
import { I_value, $S, redraw } from '@biz/c/superfine'

export
function Select<K extends string>(p: {
	options: [K, () => Children][]
	value: I_value<K>
}) {
	return $Cont({}, [
		h('label', {},
			p.options.find(opt =>
				opt[0] === p.value.val
			)![1]()
		),
		h('div', { className: 'dropdown' },
			h('ul', {},
				p.options.map(opt =>
					h('li',
						{
							key: opt[0],
							onclick: () => {
								console.log('updating', opt[0])
								p.value.set(opt[0])
								redraw()
							}
						},
						opt[1](),
					)
				)
			)
		)
	])
}

const $Cont = $S('div', css({
	label: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}))
