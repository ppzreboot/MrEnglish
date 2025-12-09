import type { ObjectId } from 'mongodb'
import { I_app_db, I_service__lookup, I_service__word_mng } from '@mr-english-server/schema'

export
function init_service__word_mng(app_db: I_app_db, lookup: I_service__lookup): I_service__word_mng {
    async function add_history(userid: ObjectId, word: string) {
        const now = new Date()
        await app_db.word.updateOne(
            { word, userid },
            {
                $set: {
                    last_lookup_at: now,
                },
                $setOnInsert: {
                    star: false,
                    first_lookup_at: now,
                },
            },
            { upsert: true },
        )
    }
    return {
        async add_history_and_get_star(userid, word) {
            await add_history(userid, word)
            const doc = await app_db.word.findOne({ word, userid })
            return doc!.star
        },
        async star(userid, word, star) {
            const count = await app_db.word.updateOne({ word, userid }, {
                $set: { star }
            })
            if (count.matchedCount !== 1)
                throw Error(`staring word: no word "${word}" found for user ${userid}`)
        },
        async is_in_ecdict(word) {
            return null !== await lookup.ecdict(word)
        },
        get_history: async (userid, limit, last) =>
            await app_db.word
                .find(last
                    ? {
                        userid,
                        $or: [ // 此处的 `or` 不是 `和 userid 发生 or`
                            { last_lookup_at: { $lt: last.update_at } },
                            {
                                last_lookup_at: last.update_at,
                                _id: { $lt: last.id },
                            },
                        ],
                    }
                    : { userid }
                )
                .sort({
                    last_lookup_at: -1, // ES6 确定了枚举属性的顺序，所以可以保证先按 last_lookup_at 再 _id
                    _id: -1,
                })
                .limit(limit)
                .toArray()
        ,
    }
}
