import type { I_response_data as I_ds_res } from '@ppz/deepseek-client'

type I_time = Date | number

export
type I_obj_id<T> = T & {
	_id: string
}

export
interface I_doc__user<Time extends I_time> {
    name?: string
    is_friend: boolean
    create_at: Time
    update_at: Time
}
export
interface I_doc__user_oauth<ID, Time extends I_time> {
    userid: ID
    provider: 'github'
    oauth_id: string
    create_at: Time
}
export
interface I_doc__session<ID, Time extends I_time> {
    userid: ID
    session_token: string
    create_at: Time
}
export
interface I_doc__vocabulary<ID, Time extends I_time> {
    userid: ID
    word: string
    star: boolean
    // count: number // count 很难统计（因为在回溯历史、刷新页面时都会触发搜索）
    last_lookup_at: Time
    first_lookup_at: Time
}

export
interface I_doc__chat<ID, Time extends I_time> {
    userid: ID
    title: string
    system_prompt: string
    create_at: Time
}

export
interface I_doc__chat_msg<ID, Time extends I_time> {
    chat_id: ID
    user_msg: string
    raw_response: I_ds_res
    create_at: Time
    finish_at: Time
}
