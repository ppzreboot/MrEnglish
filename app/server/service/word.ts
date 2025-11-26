import type { ObjectId } from 'mongodb'
import { I_app_db } from '../app-model/service/mod.ts'

export
function init_service__word_mng(app_db: I_app_db) {
    return {
        async add(userid: ObjectId, canonical: string) {
            const now = new Date()
            await app_db.word.updateOne(
                { canonical, userid },
                {
                    $set: {
                        last_lookup_at: now,
                    },
                    $inc: { count: 1 },
                    $setOnInsert: {
                        star: false,
                        first_lookup_at: now,
                    },
                },
                { upsert: true },
            )
        }
    }
}
