import type { I_app_model } from '../mongo/mod.ts'
import { make_llm_lookup, I_word } from '@ppz-ai/lookup'

export
function init_service__llm_client(opts: {
    base_url: string
    api_key: string
    app_model: I_app_model
}) {
    const llm_lookup = make_llm_lookup({
        base_url: opts.base_url,
        api_key: opts.api_key,
        model: 'grok-4-fasting-reasoning',
    })
    const lookup: I_lookup = async (word: string) => {
        const [err, result] = await llm_lookup(word)
        if (err) {
            if (err.key === 'invalid word format')
                return ['invalid word format', null]
            else {
                console.error('error on looking up ' + word)
                console.error(err)
                return ['unknown error', null]
            }
        }
        return [null, result.word]
    }
    return {
        lookup,
    }
}

type I_lookup = (word: string) => Promise<[null, I_word] | [
    'invalid word format' | 'unknown error',
    null
]>
