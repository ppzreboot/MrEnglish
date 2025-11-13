import type { ObjectId } from 'mongodb'

export
interface I_user {
    name?: string
    is_friend: boolean
    created_at: Date
    updated_at: Date
}

export
interface I_user_oauth {
    userid: ObjectId
    provider: 'github'
    oauth_id: string
    created_at: Date
}

export
interface I_session {
    userid: ObjectId
    session_token: string
    created_at: Date
}

export
interface I_lookup {
    userid: ObjectId
    word: string
    count: number
}
