import type { ObjectId } from 'mongodb'
import { I_app_model } from './mongo/mod.ts'

export
function init_service__word_mng(app_model: I_app_model) {
    return {
        async add_word(userid: ObjectId, word: string) {
            await app_model.word.updateOne(
                { word, userid },
                {
                    $inc: { count: 1 },
                },
                { upsert: true },
            )
        }
    }
}
