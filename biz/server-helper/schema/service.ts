import type { ObjectId, WithId } from 'mongodb'
import type {
    I_doc__user,
    I_doc__vocabulary,
    I_lookup_result,
    I_doc__chat,
    I_doc__chat_msg,
} from '@biz/common/entity'
import type { voc_api } from '@biz/common/api'
import type { I_ecdict } from '@ppz-ai/ecdict-sqlite3'
import type { I_app_env } from './env.ts'

export
interface I_service__session {
    get_current_user_id: () => Promise<null | ObjectId>
    get_current_user: () => Promise<null | I_doc__user<Date>>
}

export
type I_service__session_maker = (session_token: string) => I_service__session

export
interface I_service__auth {
    /** @returns session token */
    sign_up_in: (provider: 'github', oauth_id: string) => Promise<string>
    signout: (session_token: string) => Promise<void>
}

export
interface I_service__lookup {
    full: (word: string) => Promise<null | I_lookup_result>
    ecdict: (word: string) => Promise<null | I_ecdict>
}

export
interface I_service__word {
    add_vocabulary_and_get_star(user_id: ObjectId, word: string): Promise<{ id: string, star: boolean }>
    star(word_oid: ObjectId, user_id: ObjectId, star: boolean): Promise<void>
    is_in_ecdict(word: string): Promise<boolean>
    get_vocabulary(userid: ObjectId, limit: number, opts: voc_api.I_paged_list_opts): Promise<WithId<I_doc__vocabulary<ObjectId, Date>>[]>
}

export
interface I_service__llm_trans {
    own_chat(userid: ObjectId, chat_id: ObjectId): Promise<null | WithId<I_doc__chat<ObjectId, Date>>>
    new_msg(chat: WithId<I_doc__chat<ObjectId, Date>>, msg: string): AsyncGenerator<string, void, void>
    new_chat(userid: ObjectId, title: string, prompt: string): Promise<ObjectId>
    // chat_list(userid: ObjectId): Promise<WithId<I_doc__chat<ObjectId, Date>>[]>
    // msg_list(chat: WithId<I_doc__chat<ObjectId, Date>>): Promise<WithId<I_doc__chat_msg<ObjectId, Date>>[]>
    // drop_chat(chat: WithId<I_doc__chat<ObjectId, Date>>): Promise<void>
}

export
interface I_app_service {
    env: I_app_env
    session: I_service__session_maker
    auth: I_service__auth
    lookup: I_service__lookup
    word: I_service__word
    llm_trans: I_service__llm_trans
}
