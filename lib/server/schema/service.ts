import type { ObjectId } from 'mongodb'
import type { I_lookup_result, I_doc__user } from '@mr-english/schema'
import type { I_app_env } from './env.ts'
import type { I_ecdict } from '@ppz-ai/ecdict-sqlite3'

export
interface I_service__session {
    check: () => Promise<ObjectId>
    get_current_user_id: () => Promise<null | ObjectId>
    get_current_user: () => Promise<null | I_doc__user>
}

export
type I_service__session_maker = (req: Request) => I_service__session

/** @returns session token */
export
type I_service__sign_up_in = (provider: 'github', oauth_id: string) => Promise<string>

export
interface I_service__lookup {
    full: (word: string) => Promise<null | I_lookup_result>
    ecdict: (word: string) => Promise<null | I_ecdict>
}

export
interface I_service__word_mng {
    add(user_id: ObjectId, word: string): Promise<void>
    is_in_ecdict(word: string): Promise<boolean>
}

export
interface I_app_service {
    env: I_app_env
    session: I_service__session_maker
    sign_up_in: I_service__sign_up_in
    lookup: I_service__lookup
    word_mng: I_service__word_mng
}
