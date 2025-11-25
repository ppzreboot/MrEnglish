import { Database } from '@db/sqlite'
import type { I_lookup_result, I_meriam_webster } from '@mr-english/app-model'
import { make_ecdict_sqlite3 } from '@ppz-ai/ecdict-sqlite3'
import { make_lfmw } from './meriam-webster/retrieve-raw.ts'

export
function init_service__lookup(opts: {
    ecdict_sqlite3: string
    mw_cache_mongo_uri: string
    mw_api_key: string
}) {
    const lookup_from_ecdict = make_ecdict_sqlite3(
        new Database(opts.ecdict_sqlite3, {
            readonly: true,
            create: false,
            memory: false,
        })
    )
    const lookup_from_mw = make_lfmw(opts.mw_api_key)

    return async function lookup(word: string): Promise<null | I_lookup_result> {
        const ecdict_result = await lookup_from_ecdict(word)
        if (ecdict_result === null) return null

        const mw_raw_result = await lookup_from_mw(word)
        if (mw_raw_result.error) {
            console.error(`error on looking up from meriam-webster: ${word}`)
            switch(mw_raw_result.type) {
                case 'unknown':
                    console.error(`type: unknown;
                        http_status: ${mw_raw_result.response.status};
                        http_status_text: ${mw_raw_result.response.statusText};
                    `)
                    if (mw_raw_result.response.ok)
                        console.error('http body', await mw_raw_result.response.text())
                    break
                case 'zod':
                    console.error('type: zod;')
                    console.error(mw_raw_result.zod_err.issues)
                    break
            }
            return {
                ecdict: ecdict_result,
                mw: null,
            }
        }
        return {
            ecdict: ecdict_result,
            mw: mw_raw_result.data
                .filter(item => {
                    console.log(item.hwi, word,
                        item.hwi.hw === word,
                        item.fl !== undefined,
                    )
                    return item.hwi.hw === word
                    && item.fl !== undefined
                }
                )
                .map<I_meriam_webster>(item => ({
                    hw: item.hwi.hw,
                    prs: item.hwi.prs?.map(prs => ({
                        ipa: prs.ipa,
                        audio: prs.sound?.audio,
                    })),
                    fl: item.fl!,
                    shortdef: item.shortdef,
                }))
        }
    }
}
