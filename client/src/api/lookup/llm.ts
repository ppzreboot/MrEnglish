import { check_en_word } from './_base'
import { API_error, type I_response } from '../_base'

export
type I_word_llm_result = {
    is_valid: false
    details: null
} | {
    is_valid: true
    details: {
        canonical: string
        phonetic: string
        root_and_affixes: {
            root: string
            root_explanation: string
            prefixes: {
                prefix: string
                prefix_explanation: string
            }[]
            suffixes: {
                suffix: string
                suffix_explanation: string
            }[]
        }
        meaning: {
            definition: string
            example: string
        }[]
        mnemonic: string
        word_family: string[]
    }[]
}

export
async function retrieve__llm_lookup(word: string): Promise<
    [null, I_word_llm_result]
    | ['invalid word format', null]
> {
    word = word.trim()
    if (!check_en_word(word))
        return ['invalid word format', null]
    const response = await fetch('/api/lookup?word=' + word, {
      method: 'GET',
    })
    const data = await response.json() as I_response<I_word_llm_result>
    if (data.error)
        throw API_error('retrieve__lookup_llm', data.key)
    return [null, data.data]
}
