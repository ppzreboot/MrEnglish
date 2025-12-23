import { type I_page_key, pages, page_list } from '@mr-english/schema'
import { h } from './interpolation.ts'
import clite_meta from '../../.clite/.meta.ts'

export
const layout = (title: string, body: string) =>
	h`<!doctype html>
	<html lang="zh-CN">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>${title}</title>
		<link rel="icon" href="${clite_meta.asset_prefix}/favicon.ico">
		<link rel="stylesheet" href="${clite_meta.url_prefix}/${clite_meta.css}">
		<script src="${clite_meta.url_prefix}/${clite_meta.js}"></script>
	</head>
	<body>
		${body}
	</body>
	</html>`

export
const simple_page = <I_page_opts>(
	current_page: I_page_key,
	opts: I_page_opts,
	main: string,
) => {
	const page_meta = pages[current_page]
	return layout(
		'MrEnglish - ' + page_meta.title,
		h`
			<div class='simple layout'>
				<header>
					<h1>MrEnglish</h1>
					<nav>
						<ul>
							${page_list.map(page =>
								`<li>
									${page.path === page_meta.path
										? `<h2>${page.title}</h2>`
										: `<a href="${page.path}">${page.title}</a>`
									}
								</li>`
							)}
						</ul>
					</nav>
				</header>
				<main>${main}</main>
				<footer>MrEnglish</footer>
			</div>
			<script>
				CLITE.${current_page}_page(${JSON.stringify(opts)})
			</script>
		`,
	)
}
	