const RE_EMPTY: RegExp = /^\s*$/
const RE_FENCE_OPEN: RegExp = /^(\s*)(```|~~~)\s*([\w-]+)?\s*$/
const RE_HEADING: RegExp = /^(#{1,6})\s+(.*)$/
const RE_HR: RegExp = /^(\*\s*\*\s*\*|-{3,}|_{3,})\s*$/
const RE_BLOCKQUOTE: RegExp = /^\s*>/
const RE_BQ_STRIP: RegExp = /^\s*>\s?(.*)$/
const RE_UL_ITEM: RegExp = /^(\s*)[-+*]\s+(.+)$/
const RE_OL_ITEM: RegExp = /^(\s*)\d+\.\s+(.+)$/

export
function parse_markdown(input: string): string {
	const src = input.replace(/\r\n?/g, '\n')
	const lines = src.split('\n')
	const out: string[] = []
	let i = 0
	while (i < lines.length) {
		const line = lines[i]
		// 跳过空白行
		if (RE_EMPTY.test(line)) {
			i++
			continue
		}
		// 代码围栏
		const fenceMatch = line.match(RE_FENCE_OPEN)
		if (fenceMatch) {
			const fence = fenceMatch[2]
			const lang = fenceMatch[3] || ''
			i++
			const body: string[] = []
			const closeFenceRe = new RegExp('^\\s*' + escapeRegex(fence) + '\\s*$')
			while (i < lines.length && !closeFenceRe.test(lines[i])) {
				body.push(lines[i])
				i++
			}
			if (i < lines.length) i++
			const code = body.join('\n')
			const cls = lang ? ` class="language-${attrEscape(lang)}"` : ''
			out.push(`<pre><code${cls}>${escapeHTML(code)}</code></pre>`)
			continue
		}
		// 标题
		const heading = line.match(RE_HEADING)
		if (heading) {
			const level = heading[1].length
			out.push(`<h${level}>${inline(heading[2].trim())}</h${level}>`)
			i++
			continue
		}
		// 水平分割线
		if (RE_HR.test(line)) {
			out.push('<hr/>')
			i++
			continue
		}
		const table = matchTable(lines, i)
		if (table) {
			out.push(table.html)
			i = table.next
			continue
		}
		// 引用块
		if (RE_BLOCKQUOTE.test(line)) {
			const bq: string[] = []
			while (i < lines.length && RE_BLOCKQUOTE.test(lines[i])) {
				const m = lines[i].match(RE_BQ_STRIP)
				bq.push(m ? m[1] : '')
				i++
			}
			const inner = parse_markdown(bq.join('\n'))
			out.push(`<blockquote>${inner}</blockquote>`)
			continue
		}
		const list = matchList(lines, i)
		if (list) {
			out.push(list.html)
			i = list.next
			continue
		}
		// 段落（合并非空行，直到遇到下一个块级起始）
		const para: string[] = []
		while (i < lines.length) {
			const l = lines[i]
			if (RE_EMPTY.test(l)) {
				i++
				break
			}
			if (/^(\s*)(```|~~~)/.test(l)) break
			if (/^(#{1,6})\s+/.test(l)) break
			if (RE_BLOCKQUOTE.test(l)) break
			if (/^\s*([-+*]\s+|\d+\.\s+)/.test(l)) break
			if (RE_HR.test(l)) break
			const t = matchTable(lines, i)
			if (t) break
			const li = matchList(lines, i)
			if (li) break
			para.push(l)
			i++
		}
		const text = para.join(' ').trim()
		if (text) out.push(`<p>${inline(text)}</p>`)
	}
	return out.join('')
}

type I_list_type = 'ul' | 'ol'

interface I_list_match {
	html: string
	next: number
}

interface I_table_match {
	html: string
	next: number
}

interface I_list_line {
	type: I_list_type
	indent: number
	text: string
}

function matchListLine(line: string): null | I_list_line {
	const mUn = line.match(RE_UL_ITEM)
	if (mUn) {
		return {
			type: 'ul',
			indent: mUn[1].length,
			text: mUn[2],
		}
	}
	const mOl = line.match(RE_OL_ITEM)
	if (mOl) {
		return {
			type: 'ol',
			indent: mOl[1].length,
			text: mOl[2],
		}
	}
	return null
}

function buildList(lines: string[], start: number, listType: I_list_type, baseIndent: number): I_list_match {
	const tag = listType === 'ol' ? 'ol' : 'ul'
	const items: string[] = []
	let i = start
	while (i < lines.length) {
		const info = matchListLine(lines[i])
		if (!info || info.indent < baseIndent || info.type !== listType) break
		if (info.indent > baseIndent) break
		let content = inline(info.text.trim())
		i++
		while (i < lines.length) {
			const next = matchListLine(lines[i])
			if (next && next.indent > baseIndent) {
				const nested = buildList(lines, i, next.type, next.indent)
				content += nested.html
				i = nested.next
				continue
			}
			if (!next || next.indent < baseIndent || next.type !== listType) break
			if (next.indent === baseIndent) break
		}
		items.push(`<li>${content}</li>`)
		while (i < lines.length && RE_EMPTY.test(lines[i])) i++
	}
	return {
		html: `<${tag}>${items.join('')}</${tag}>`,
		next: i,
	}
}

function matchList(lines: string[], index: number): null | I_list_match {
	const info = matchListLine(lines[index])
	if (!info) return null
	return buildList(lines, index, info.type, info.indent)
}

function isTableSeparator(line: string): boolean {
	return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/.test(line)
}

function splitTableRow(line: string): string[] {
	let t = line.trim()
	if (t.startsWith('|')) t = t.slice(1)
	if (t.endsWith('|')) t = t.slice(0, -1)
	return t.split('|').map(c => c.trim())
}

function matchTable(lines: string[], index: number): null | I_table_match {
	if (index + 1 >= lines.length) return null
	const headerLine = lines[index]
	const sepLine = lines[index + 1]
	if (!headerLine.includes('|')) return null
	if (!isTableSeparator(sepLine)) return null
	const headerCells = splitTableRow(headerLine)
	let i = index + 2
	const bodyRows: string[][] = []
	while (i < lines.length) {
		const line = lines[i]
		if (RE_EMPTY.test(line)) {
			i++
			continue
		}
		if (!line.includes('|')) break
		bodyRows.push(splitTableRow(line))
		i++
	}
	const headHtml = headerCells.map(c => `<th>${inline(c)}</th>`).join('')
	const bodyHtml = bodyRows
		.map(row => `<tr>${row.map(c => `<td>${inline(c)}</td>`).join('')}</tr>`)
		.join('')
	return {
		html: `<table><thead><tr>${headHtml}</tr></thead><tbody>${bodyHtml}</tbody></table>`,
		next: i,
	}
}

function escapeRegex(s: string): string {
	return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function escapeHTML(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
}

function attrEscape(s: string): string {
	return String(s)
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
}

function inline(t: string): string {
	const codeSpans: string[] = []
	// 1) 先屏蔽行内代码
	t = t.replace(/`([^`\n]+)`/g, (_, c: string) => {
		const id = codeSpans.push(c) - 1
		return `\u0007CODE${id}\u0007`
	})
	// 2) 转义普通文本（不影响后续占位符）
	t = escapeHTML(t)
	// 3) 链接与图片先转换为 HTML
	t = t.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]+)")?\)/g, (_, alt: string, src: string, title?: string) => {
		const a = attrEscape(alt || '')
		const s = attrEscape(src || '')
		const ti = title ? ` title="${attrEscape(title)}"` : ''
		return `<img alt="${a}" src="${s}"${ti}/>`
	})
	t = t.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]+)")?\)/g, (_, label: string, href: string, title?: string) => {
		const h = attrEscape(href || '')
		const ti = title ? ` title="${attrEscape(title)}"` : ''
		return `<a href="${h}"${ti}>${label}</a>`
	})
	// 4) 暂存 HTML 标签，避免强调进入标签
	const tags: string[] = []
	t = t.replace(/<[^>]+>/g, (m) => {
		const id = tags.push(m) - 1
		return `\u0007TAG${id}\u0007`
	})
	// 5) 强调
	t = t.replace(/~~(.+?)~~/g, '<del>$1</del>')
	t = t.replace(/(\*\*|__)(.+?)\1/g, '<strong>$2</strong>')
	t = t.replace(/(\*|_)(.+?)\1/g, '<em>$2</em>')
	// 6) 还原标签与代码
	t = t.replace(/\u0007TAG(\d+)\u0007/g, (_, n: string) => tags[Number(n)] ?? '')
	t = t.replace(/\u0007CODE(\d+)\u0007/g, (_, n: string) => {
		const code = codeSpans[Number(n)] ?? ''
		return `<code>${escapeHTML(code)}</code>`
	})
	return t
}
