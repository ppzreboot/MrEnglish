import { check_en_word } from '@mr-english/util'
import { type I_api_output, output } from '@mr-english-client/api'
import { type I_lookup_result, schema__api_output__lookup_result } from '@mr-english/schema'

export
async function retrieve__lookup(word: string):
    I_api_output<I_lookup_result
        , 'invalid word format'
        | 'word not found'
        >
{
    word = word.trim()
    if (!check_en_word(word))
        return ['invalid word format', null]
    const response = await fetch('/api/lookup?word=' + word, {
      method: 'GET',
    })
    const data = await output('retrieve__lookup', response, schema__api_output__lookup_result)
    if (data === null)
        return ['word not found', null]
    return [null, data]
}
