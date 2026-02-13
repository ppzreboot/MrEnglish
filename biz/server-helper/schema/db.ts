import type { ObjectId } from 'mongodb'
import type { Collection } from 'mongodb'
import type {
    I_doc__user,
    I_doc__user_oauth,
    I_doc__session,
    I_doc__vocabulary,
    I_doc__chat,
    I_doc__chat_msg,
} from '@biz/common/entity'

export
interface I_app_db {
    user: Collection<I_doc__user<Date>>
    user_oauth: Collection<I_doc__user_oauth<ObjectId, Date>>
    session: Collection<I_doc__session<ObjectId, Date>>
    vocabulary: Collection<I_doc__vocabulary<ObjectId, Date>>
    llm_trans_chat: Collection<I_doc__chat<ObjectId, Date>>
    llm_trans_chat_msg: Collection<I_doc__chat_msg<ObjectId, Date>>
}