export
type I_init_data = null | {
	word: string
	valid_ecdict: false
	record: null
} | {
	word: string
	valid_ecdict: true
	record: {
		id: string
		star: boolean
	}
}
