import { h } from './interpolation.ts'
import type { I_clite_page_meta } from '../../common/mod.ts'
import type { I_clite_meta } from '../type.ts'

export
const layout = <PK extends string>(props: {
	clite_meta: I_clite_meta<PK>
	title: string
	head: null | string
	body: string
}) =>
	h`<!doctype html>
	<html lang="zh-CN">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>${props.title}</title>
		<link rel="icon" href="${props.clite_meta.asset_prefix}/favicon.ico">
		<link rel="stylesheet" href="${props.clite_meta.url_prefix}/${props.clite_meta.global_style}">
		${props.head}
	</head>
	<body>
		${props.body}
	</body>
	</html>`

export
const simple_page = <PK extends string>(props: {
	title: string
	page_meta: I_clite_page_meta<PK>
	clite_meta: I_clite_meta<PK>
	opts: unknown
}) => {
	const clite_meta = props.clite_meta
	const pages = clite_meta.pages
	const page_meta = props.page_meta
	const pk = page_meta.key
	return layout({
		clite_meta: clite_meta,
		title: props.title,
		head: pages[pk].css &&
			`<link rel="stylesheet" href="${clite_meta.url_prefix}/${pages[pk].css}">`
		,
		body:
			h`<div id="app-root"></div>
			<script type="module">
			import { main } from '${clite_meta.url_prefix}/${pages[pk].js}'
			main(document.getElementById('app-root'), ${JSON.stringify(props.opts)})
			</script>`
		,
	})
}
	
export
const respond_html = (html: string) =>
	new Response(html, {
		headers: {
			'Content-Type': 'text/html',
			'Cache-Control': 'no-store',
		}
	})
