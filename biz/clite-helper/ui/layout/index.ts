import { type ElementVNode, h, text } from 'hyperapp'
import { page_list } from '@biz/common/page'
import { $ } from './style.ts'

const current_path = location.pathname

export
const Layout = <S>(main: ElementVNode<S>) =>
	$.layout<S>({}, [
		Header(),
		$.main({}, main),
		Footer(),
	])

const Header = <S>() =>
	$.header<S>({}, [
		h('h1', {}, [text('MrEnglish')]),
		h('nav', {}, [
			h('ul', {},
				page_list.map(p =>
					h('li', { key: p.key }, [
						p.path === current_path
							? h('h2', {}, [text(p.title)])
							: h('a', { href: p.path }, [text(p.title)])
					])
				)
			)
		])
	])

const Footer = <S>() =>
	$.footer<S>({}, [
		text('MrEnglish')
	])
