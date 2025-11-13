import { API_error, type I_response } from './_base'

export
type I_auth_status = {
    signed_in: true
} | {
    signed_in: false
    oauth_list: {
        key: 'github'
        link: string
    }[]
}

function check_en_word(word: string) {
    if (word.length === 0 || word.length > 50) return false
    return /^[A-Za-z]+(-[A-Za-z]+)*$/.test(word)
}

export
type I_word_result = {
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
async function retrieve__lookup(word: string): Promise<
    [null, I_word_result]
    | ['invalid word format', null]
> {
    word = word.trim()
    if (!check_en_word(word))
        return ['invalid word format', null]
    const response = await fetch('/api/lookup?word=' + word, {
      method: 'GET',
    })
    const data = await response.json() as I_response<I_word_result>
    if (data.error)
        throw API_error('retrieve__lookup', data.key)
    return [null, data.data]
}
