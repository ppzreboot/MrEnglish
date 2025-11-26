import type { ObjectId } from 'mongodb'
import type { Collection } from 'mongodb'
import type { I_doc__user, I_doc__user_oauth, I_doc__session, I_doc__word } from '@mr-english/schema'

export
interface I_app_db {
    user: Collection<I_doc__user>
    user_oauth: Collection<I_doc__user_oauth<ObjectId>>
    session: Collection<I_doc__session<ObjectId>>
    word: Collection<I_doc__word<ObjectId>>
}