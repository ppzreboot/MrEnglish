export
type I_clite_page_meta<PK extends string> = {
	key: PK
	path: string
	show_in_nav: true

	title: string
} | {
	key: PK
	path: string
	show_in_nav: false
}

export
type I_clite_pages<PK extends string> = {
	[k in PK]: I_clite_page_meta<k>
}
