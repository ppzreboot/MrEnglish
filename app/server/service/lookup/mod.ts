import { Database } from '@db/sqlite'
import { MongoClient } from 'mongodb'
import { z } from 'zod'
import { make_ecdict_sqlite3 } from '@ppz-ai/ecdict-sqlite3'
import {
    type I_mw_error,
    type I_raw_mw_entry,
    lookup_from_mw,
    format_raw,
} from '@mr-english/meriam-webster'
import type { I_lookup_result } from '@mr-english/schema'
import type { I_service__lookup } from '@mr-english-server/schema'

interface I_doc__raw_mw_cache {
    word: string
    raw?: I_raw_mw_entry[]
}

export
async function init_service__lookup(opts: {
    ecdict_sqlite3: string
    mw_cache_mongo_uri: string
    mw_apikey: string
}): Promise<I_service__lookup> {
    console.log('opening ecdict sqlite3 at', opts.ecdict_sqlite3)
    const lookup_from_ecdict = make_ecdict_sqlite3(
        new Database(opts.ecdict_sqlite3, {
            readonly: true,
            create: false,
            memory: false,
        })
    )

    console.log('connecting to meriam-webster cache db')
    const mongo = await new MongoClient(opts.mw_cache_mongo_uri).connect()
    console.log('connnected to meriam-webster cache db')
    const mw_cache = mongo
        .db('mw-cache')
        .collection<I_doc__raw_mw_cache>('raw')

    async function lookup(word: string): Promise<null | I_lookup_result> {
        const ecdict_result = await lookup_from_ecdict(word)
        if (ecdict_result === null) return null

        // 尝试从缓存读取
        const cached_mw_result = await mw_cache.findOne(
            { word },
            { collation: { locale: 'en', strength: 2 } },
        )
        if (cached_mw_result !== null) {
            if (cached_mw_result.raw === undefined)
                return { ecdict: ecdict_result }
            else
                return {
                    ecdict: ecdict_result,
                    mw: format_raw(word, cached_mw_result.raw),
                }
        }

        // console.log('lookup meriam-webster:', word)
        const mw_result = await lookup_from_mw(opts.mw_apikey, word)
        if (mw_result.error) {
            console.log(`cache meriam-webster "${word}" as not found`)
            await mw_cache.insertOne({ word }) // “不存在”也是数据
            console.error(format_mw_error(word, mw_result))
            return { ecdict: ecdict_result }
        }
        console.log(`cache meriam-webster "${word}"`)
        // 如果有两个人查同一个单词，这里会报错
        await mw_cache.insertOne({ word, raw: mw_result.raw })
        if (mw_result.data.length === 0) {
            console.warn(`meriam-webster: "${word}" has no valid entry`)
            return { ecdict: ecdict_result }
        }
        return {
            ecdict: ecdict_result,
            mw: mw_result.data,
        }
    }

    return {
        ecdict: lookup_from_ecdict,
        full: lookup,
    }
}

export
function format_mw_error(word: string, err: I_mw_error) {
    if (err.type === 'not a word')
        return `meriam-webster error (${word}): ${err.raw_body}`
    return `meriam-webster error (${word}):
http status: ${err.response.status}
http status text: ${err.response.statusText}
zod error: ${z.prettifyError(err.zod_err)}
raw body: ${err.raw_body}
`
}
