import { h, text, type I_props, type I_children } from '#/superfine/mod.ts'
import { $Layout, $Header, $Main, $Footer } from './_style.ts'
import { Nav } from './_common.ts'

export
const Layout = (props: I_props, children: I_children) =>
	$Layout(props, [
		$Header({}, [
			h('h1', {}, text('MrEnglish')),
			Nav(),
		]),
		$Main({}, children),
		$Footer({}, text('MrEnglish@2006 - demo')),
	])
