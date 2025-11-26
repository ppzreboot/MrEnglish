import type { ObjectId } from 'mongodb'
import type { Collection } from 'mongodb'

export
interface I_doc__user {
    name?: string
    is_friend: boolean
    created_at: Date
    updated_at: Date
}
export
interface I_doc__user_oauth {
    userid: ObjectId
    provider: 'github'
    oauth_id: string
    created_at: Date
}
export
interface I_doc__session {
    userid: ObjectId
    session_token: string
    created_at: Date
}
export
interface I_doc__word {
    userid: ObjectId
    canonical: string
    star: boolean
    count: number
    last_lookup_at: Date
    first_lookup_at: Date
}
export
interface I_app_db {
    user: Collection<I_doc__user>
    user_oauth: Collection<I_doc__user_oauth>
    session: Collection<I_doc__session>
    word: Collection<I_doc__word>
}