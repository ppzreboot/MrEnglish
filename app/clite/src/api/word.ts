import { output } from '@mr-english-client/api'
import { schema__api_output__star_word, schema__api_output__get_lookup_history } from '@mr-english/schema'

export
async function post__star_word(word: string, star: boolean) {
	return await output(
		'post__star_word',
		await fetch(`/api/word/star?word=${word}&star=${star ? 1 : 0}`, {
			method: 'POST',
		}),
		schema__api_output__star_word,
	)
}

export
interface I_cursor__word {
	id: string
	update_at: number
}

export
async function retrieve__history(last: null | I_cursor__word) {
	const search = last === null
		? ''
		: `?update_at=${last.update_at}&id=${last.id}`
	return await output(
		'retieve__history',
		await fetch('/api/word/history' + search),
		schema__api_output__get_lookup_history,
	)
}
