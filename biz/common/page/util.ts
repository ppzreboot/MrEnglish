import { pages } from './meta.ts'

export
const home_page_url = (word: string) =>
	pages.home.path + '?q=' + encodeURIComponent(word)
