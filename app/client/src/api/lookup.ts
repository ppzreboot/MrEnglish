import { is_valid_en_phrase } from '@mr-english/util'
import { type I_api_output, output } from '@mr-english-client/api'
import { type I_lookup_output, schema__api_output__lookup_result } from '@mr-english/schema'

export
async function retrieve__lookup(word: string):
    I_api_output<I_lookup_output | null
        , 'invalid word format'
        >
{
    word = word.trim()
    if (!is_valid_en_phrase(word))
        return ['invalid word format', null]
    const response = await fetch('/api/lookup?word=' + word, {
      method: 'GET',
    })
    const data = await output('retrieve__lookup', response, schema__api_output__lookup_result)
    return [null, data]
}
