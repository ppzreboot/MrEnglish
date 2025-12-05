import type { ObjectId } from 'mongodb'
import { I_app_db, I_service__lookup, I_service__word_mng } from '@mr-english-server/schema'

export
function init_service__word_mng(app_db: I_app_db, lookup: I_service__lookup): I_service__word_mng {
    return {
        async add(userid: ObjectId, word: string) {
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
        },
        async is_in_ecdict(word: string) {
            return null !== await lookup.ecdict(word)
        },
    }
}
