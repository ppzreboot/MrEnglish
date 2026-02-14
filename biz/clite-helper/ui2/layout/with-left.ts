import { css } from 'goober'

import { cns } from '@biz/common/util'
import { h, text, type I_props, type I_children, $S, redraw } from '#/superfine/mod.ts'

import { $Layout, $Header, $Main, $Footer } from './_style.ts'
import { Nav } from './_common.ts'
import { SVG__collapse_menu } from '../icon.ts'

export
interface I_visible {
	get: () => boolean
	set: (v: boolean) => void
}
type I_left = (props: I_visible) => I_children

export
const Layout_with_left = () => {
	let left_visable = true
	const left_width = 250

	return (props: I_props, Left: I_left, children: I_children) =>
		$Cont(props, [
			$Left(
				{ style: `width: ${left_visable ? left_width : 0}px;` },
				h('div',
					{
						style: `width: ${left_width}px;`, // 保持 menu 内部形状
					},
					Left({
						get: () => left_visable,
						set: v => left_visable = v,
					})
				),
			),
			$Right({},
				$Layout({}, [
					$Header({}, [
						!left_visable &&
							$show_menu_btn(
								{
									onclick: () => {
										if (left_visable === true)
											throw Error('LEFT is already visible')
										left_visable = true
										redraw()
									}
								}, 
								SVG__collapse_menu(),
							)
						,
						h('h1', {}, text('MrEnglish')),
						Nav(),
					]),
					$Main({}, children),
					$Footer({}, text('MrEnglish@2006 - demo')),
				])
			),
		])
}

const $Cont = $S('div', css({
	'@media (min-width: 1000px)': {
		display: 'flex',
	},
}))
const $Left = $S('aside', css({
	transition: 'width .1s ease',
	overflow: 'hidden',
	'& > div': {
		borderRight: `1px solid rgba(var(--font-color), .3)`,
		height: '100vh',
	},
}))
const $Right = $S('div', css({
	flex: 1,
}))
const $show_menu_btn = $S('button',
	cns('icon-btn',
		css({
			fontSize: '1.5rem',
			opacity: .6,
			'&:hover': {
				opacity: 1,
			},
		})
	)
)
