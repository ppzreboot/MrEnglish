export
interface I_clite_meta<PK extends string> {
	git_describe: string
	last_compiled: Date
	out_dir: string
	url_prefix: string
	asset_prefix: string
	global_style: string // 不可为空，用于提示用户“css 不可 split”
	pages: Record<PK, {
		js: string
		css: null | string
	}>
}
