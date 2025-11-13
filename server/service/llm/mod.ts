import type { I_app_model } from '../mongo/mod.ts'
import { make_llm_lookup } from '@ppz-ai/lookup'

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
    return {
        lookup: (word: string) => {
            const [err, result] = llm_lookup(word)
        },
    }
}
