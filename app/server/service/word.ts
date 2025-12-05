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
        async add_history_and_get_star(userid: ObjectId, word: string) {
            await add_history(userid, word)
            const doc = await app_db.word.findOne({ word, userid })
            return doc!.star
        },
        async star(userid: ObjectId, word: string, star: boolean) {
            const count = await app_db.word.updateOne({ word, userid }, {
                $set: { star }
            })
            if (count.matchedCount !== 1)
                throw Error(`staring word: no word "${word}" found for user ${userid}`)
        },
        async is_in_ecdict(word: string) {
            return null !== await lookup.ecdict(word)
        },
    }
}
