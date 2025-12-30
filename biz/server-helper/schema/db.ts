import type { ObjectId } from 'mongodb'
import type { Collection } from 'mongodb'
import type { I_doc__user, I_doc__user_oauth, I_doc__session, I_doc__vocabulary } from '@biz/common/entity'

export
interface I_app_db {
    user: Collection<I_doc__user<Date>>
    user_oauth: Collection<I_doc__user_oauth<ObjectId, Date>>
    session: Collection<I_doc__session<ObjectId, Date>>
    vocabulary: Collection<I_doc__vocabulary<ObjectId, Date>>
}