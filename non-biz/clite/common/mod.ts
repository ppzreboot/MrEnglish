export
interface I_clite_page_meta<PK extends string> {
	key: PK
	path: string
	title: string
	show_in_nav: boolean
}

export
type I_clite_pages<PK extends string> = {
	[k in PK]: I_clite_page_meta<k>
}
