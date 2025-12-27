import { copy } from '@std/fs'
import { build } from 'esbuild'
import { denoPlugin } from '@deno/esbuild-plugin'
import { join, SEPARATOR } from '@std/path'

import {
	type I_page_key,
	page_list,
	is_page_key,
} from '@biz/common/page'

const out_dir = '../server-app/.clite'
const asset_dir = 'asset'
const public_path = '/static' // 必须是绝对路径

// compile
const result = await build({
	entryPoints: [
		{
			in: 'src/style/index.css',
			out: 'global-style',
		},
		...page_list.map(meta => ({
			in: `src/page/${meta.key}/index.ts`,
			out: meta.key,
		})),
	],
	entryNames: '[name].[hash]',
	outdir: out_dir,
	publicPath: public_path, // https://esbuild.github.io/api/#public-path
	format: 'esm',
	splitting: true,
	bundle: true,
	write: false,
	treeShaking: true,
	minify: false,
	loader: {
	},
	plugins: [denoPlugin()],
})
for (const output of result.outputFiles)
	console.log(output.path)

// 打印编译日志
if (result.warnings.length) {
	console.warn('\nesbuild warnings:')
	console.warn(result.warnings)
}
if (result.errors.length) {
	console.error('\nesbuild errors:')
	console.error(result.errors)
}

// 如果有老文件，就删除
if (await exists(out_dir))
	await Deno.remove(out_dir, { recursive: true })
// 创建新文件夹
await Deno.mkdir(out_dir, { recursive: true })
// 写入 clite meta
await write_manifest()
// 复制 asset 文件
await copy(asset_dir, join(out_dir, asset_dir), {
	overwrite: true,
	preserveTimestamps: false,
})
// 写入 compiled 文件
await Promise.all(
	result.outputFiles.map(
		file => Deno.writeFile(file.path, file.contents)
	)
)

async function write_manifest() {
	const pages: Partial<Record<I_page_key, { js: string, css: string | null }>> = {}

	for (const file of result.outputFiles) {
		const entry = parse_entry(file.path)
		if (entry === null || entry.is_css)
			continue
		if (is_page_key(entry.entry_name))
			pages[entry.entry_name] = { js: entry.filename, css: null }
	}
	for (const file of result.outputFiles) {
		const entry = parse_entry(file.path)
		if (entry === null || entry.is_js)
			continue
		if (is_page_key(entry.entry_name))
			pages[entry.entry_name]!.css = entry.filename
	}

	Deno.writeTextFileSync(
		join(out_dir, '.meta.ts'),
`export default {
	git_describe: '${await read_git()}',
	last_compiled: new Date(${Date.now()}),

	out_dir: import.meta.dirname!, // .meta.ts 所在目录即 out_dir
	url_prefix: '${public_path}',
	asset_prefix: '${join(public_path, asset_dir)}', // 在这里拼接好，serve 时就不用依赖 @std/path 了
	global_style: '${get_global_style_path()}',
	pages: ${JSON.stringify(pages, null, 2)}
}`
	)

	function parse_entry(path: string) {
		const filename = path.split(SEPARATOR).pop()!
		const is_js = filename.endsWith('.js')
		const is_css = filename.endsWith('.css')
		if (!is_js && !is_css) // 不是 js 或 css
			return null
		const name_partial = filename.split('.')
		name_partial.pop()
		if (name_partial.length < 2) // 不满足 entry 命名规则
			return null
		const hash = name_partial.pop()!
		return {
			entry_name: name_partial.join('.'),
			filename,
			hash,
			is_js,
			is_css,
		}
	}
	function get_global_style_path() {
		for (const file of result.outputFiles) {
			const entry = parse_entry(file.path)
			if (entry === null) continue
			if (entry.is_css && entry.entry_name === 'global-style')
				return entry.filename
		}
	}
}

export
async function read_git() {
	// git describe --tags --dirty --always
	const cmd = new Deno.Command('git', {
		args: ['describe', '--tags', '--dirty', '--always'],
	})
	const result = await cmd.output()
	return new TextDecoder().decode(
		result.success
			? result.stdout
			: result.stderr
	).trim()
}

export
async function exists(path: string): Promise<boolean> {
  try {
    await Deno.stat(path)
    return true
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) return false
    throw err
  }
}
