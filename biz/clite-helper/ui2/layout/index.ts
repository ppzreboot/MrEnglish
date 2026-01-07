import { css } from 'goober'
import { h, text, $S, type I_props, type I_children } from '#/superfine/mod.ts'
import { page_list } from '@biz/common/page'

const current_path = location.pathname

export
const Layout = (props: I_props, children: I_children) =>
	$Layout(props, [
		$Header({}, [
			h('h1', {}, text('MrEnglish')),
			h('nav', {}, [
				h('ul', {},
					page_list.map(p =>
						h('li', { key: p.key },
							p.path === current_path
								? h('h2', {}, text(p.title))
								: h('a', { href: p.path }, text(p.title))
						)
					)
				)
			])
		]),
		$Main({}, children),
		$Footer({}, text('MrEnglish')),
	])

const $Layout = $S('div', css({
	maxWidth: '1000px',
	minHeight: '100svh',
	display: 'flex',
	flexDirection: 'column',
	margin: '0 auto',
	padding: '0 2em',
	'@media (max-width: 500px)': {
		padding: '0 8px',
	},
}))

const $Header = $S('header', css({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	height: '3em',
	'@media (min-width: 1000px)': {
		marginLeft: 'calc(50% - 50vw)',
		marginRight: 'calc(50% - 50vw + 10px)', /* 最后的 10px 是防止横向滚动条的 */
		paddingLeft: '2em',
		paddingRight: '2em',
	},
	h1: {
		width: '1px',
		height: '1px',
		opacity: '0',
	},
	nav: {
		ul: {
			display: 'flex',
			gap: '1em',
		},
		h2: {
			fontSize: 'var(--fs)',
			fontWeight: '400',
			lineHeight: 'inherit',
			margin: '0',
		},
	},
}))

const $Main = $S('main', css({
	flexGrow: 1,
}))

const $Footer = $S('footer', css({
	textAlign: 'center',
	fontSize: 'var(--fs-x-sm)',
	lineHeight: '3',
	marginTop: '2em',
	opacity: '.3',
}))
