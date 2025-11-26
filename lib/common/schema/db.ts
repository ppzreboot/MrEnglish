export
interface I_doc__user {
    name?: string
    is_friend: boolean
    created_at: Date
    updated_at: Date
}
export
interface I_doc__user_oauth<ID> {
    userid: ID
    provider: 'github'
    oauth_id: string
    created_at: Date
}
export
interface I_doc__session<ID> {
    userid: ID
    session_token: string
    created_at: Date
}
export
interface I_doc__word<ID> {
    userid: ID
    canonical: string
    star: boolean
    count: number
    last_lookup_at: Date
    first_lookup_at: Date
}
