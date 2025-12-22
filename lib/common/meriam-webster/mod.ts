import { check_en_word } from '@mr-english/util'
import {
    schema__mw_entries,
    type I_formatted_meriam_webster_prs,
    type I_mw_error,
    type I_formatted_meriam_webster_entry,
    type I_raw_mw_entry,
} from './schema.ts'

export type {
    I_mw_error,
    I_formatted_meriam_webster_prs,
    I_formatted_meriam_webster_entry,
    I_raw_mw_entry,
}

type I_lookup_result = I_mw_error | {
    error: false
    data: I_formatted_meriam_webster_entry[]
    raw: I_raw_mw_entry[]
}

export * from './audio-url.ts'

export
async function lookup_from_mw(apikey: string, word: string): Promise<I_lookup_result> {
    if (!check_en_word(word))
        return { error: true, type: 'not a word', raw_body: 'PPz 未发送请求' }

    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apikey}`)
    const raw_body = await response.text()
    if (raw_body === 'Invalid API key. Not subscribed for this reference.')
        throw Error('Meriam Webster API key is not valid')

    const json_body = JSON.parse(raw_body)
    if (json_body instanceof Array && json_body.every(item => typeof(item) === 'string'))
        return {
            error: true,
            type: 'not a word',
            raw_body,
        }
    const parsed = schema__mw_entries.safeParse(json_body)
    if (parsed.success)
        return {
            error: false,
            data: format_raw(word, parsed.data),
            raw: json_body,
        }
    else
        return {
            error: true,
            type: 'zod',
            zod_err: parsed.error,
            raw_body,
            response,
        }
}

export
function format_raw(word: string, raw: I_raw_mw_entry[]) {
    word = word.toLowerCase()
    return raw
        .filter(item =>
            item.fl &&
            item.hwi.hw.split('*').join('').toLowerCase() === word
        )
        .map<I_formatted_meriam_webster_entry>(item => ({
            hw: item.hwi.hw,
            prs: item.hwi.prs?.map(prs => ({
                ipa: prs.ipa,
                audio: prs.sound?.audio,
            })),
            fl: item.fl!,
            shortdef: item.shortdef,
        }))
}
