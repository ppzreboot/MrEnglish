import clite_meta from '../../.clite/.meta.ts'
import { type I_page_meta, page_list } from './meta.ts'

export
const layout = (title: string, body: string) =>
	`<!doctype html>
	<html lang="zh-CN">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>${title}</title>
		<link rel="icon" href="${clite_meta.asset_prefix}/favicon.ico">
		<link rel="stylesheet" href="${clite_meta.url_prefix}/${clite_meta.css}">
		<script src="${clite_meta.url_prefix}/${clite_meta.js}"></script>
	</head>
	${body}
	</html>`

export
const simple_page = (current_page: I_page_meta, main: string) =>
	layout(
		'MrEnglish - ' + current_page.title,
		`<div class='simple layout'>
			<header>
				<h1>MrEnglish</h1>
				<nav>
					<ul>
						${page_list.map(page =>
							`<li>
								${page.path === current_page.path
									? `<h2>${page.title}</h2>`
									: `<a href="${page.path}">${page.title}</a>`
								}
							</li>`
						).join('')}
					</ul>
				</nav>
			</header>
			<main>${main}</main>
			<footer>MrEnglish</footer>
		</div>`,
	)
	