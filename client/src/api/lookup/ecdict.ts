import { check_en_word } from './_base'
import { API_error, type I_response } from '../_base'


export
type I_collins = 1 | 2 | 3 | 4 | 5

export
type I_exchange_type = 'p' | 'd' | 'i' | '3' | 'r' | 't' | 's' | '0' | '1'

export
interface I_ecdict {
    word: string
    phonetic: null | string
    definition: string[]
    translation: string[]
    // pos: 
    collins: null | I_collins
    oxford: boolean
    // tag: string[]
    bnc: null | number
    frq: null | number
    exchange: Record<I_exchange_type, string | undefined>
}

export
type I_word_ecdict_result = {
    is_valid: false
    details: null
} | {
    is_valid: true
    details: I_ecdict
}

export
async function retrieve__ecdict_lookup(word: string): Promise<
    [null, I_word_ecdict_result]
    | ['invalid word format', null]
> {
    word = word.trim()
    if (!check_en_word(word))
        return ['invalid word format', null]
    const response = await fetch('/api/lookup?source=ecdict&word=' + word, {
      method: 'GET',
    })
    const data = await response.json() as I_response<I_word_ecdict_result>
    if (data.error)
        throw API_error('retrieve__ecdict_lookup', data.key)
    return [null, data.data]
}
