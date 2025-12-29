import { styled } from 'goober'
import type { ReactNode } from 'react'
import { page_list } from '@biz/common/page'

const current_path = location.pathname

export
const Layout = (props: { children: ReactNode }) =>
	<$Layout>
		<$Header>
			<h1>MrEnglish</h1>
			<nav>
				<ul>
					{page_list.map(p =>
						<li key={p.key}>
							{p.path === current_path
								? <h2>{p.title}</h2>
								: <a href={p.path}>{p.title}</a>
							}
						</li>
					)}
				</ul>
			</nav>
		</$Header>
		<$Main>{props.children}</$Main>
		<$Footer>MrEnglish</$Footer>
	</$Layout>

const $Layout = styled('div')({
	maxWidth: '1000px',
	minHeight: '100svh',
	display: 'flex',
	flexDirection: 'column',
	margin: '0 auto',
	padding: '0 2em',
	'@media (max-width: 500px)': {
		padding: '0 8px',
	},
})
const $Header = styled('header')({
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
})
const $Main = styled('main')({
	flexGrow: 1,
})
const $Footer = styled('footer')({
	textAlign: 'center',
	fontSize: 'var(--fs-x-sm)',
	lineHeight: '3',
	marginTop: '2em',
	opacity: '.3',
})
