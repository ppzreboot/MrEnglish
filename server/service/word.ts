import type { ObjectId } from 'mongodb'
import { I_app_model } from './mongo/mod.ts'

export
function init_service__word_mng(app_model: I_app_model) {
    return {
        async add_word(userid: ObjectId, canonical: string) {
            const now = new Date()
            await app_model.word.updateOne(
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
