import type { I_app_model } from '../mongo/mod.ts'
import { search_word } from './word.ts'

export
function init_service__llm_client(opts: {
    base_url: string
    api_key: string
    app_model: I_app_model
}) {
    const llm_client_opts = {
        base_url: opts.base_url,
        api_key: opts.api_key,
    }
    return {
        lookup: (word: string) => search_word(llm_client_opts, word),
    }
}
