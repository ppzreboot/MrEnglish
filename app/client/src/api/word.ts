import { output } from '@mr-english-client/api'
import { schema__api_output__star_word } from '@mr-english/schema'

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
