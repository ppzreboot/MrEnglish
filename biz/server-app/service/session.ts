import type { I_app_db, I_service__session_maker, I_service__session } from '@biz/s/schema'
import { parse_cookie } from '../utils/parse-cookie.ts'

export
function init_service__session_maker(
    app_db: I_app_db,
    session_duration_ms: number,
): I_service__session_maker {
    return function session(req: Request): I_service__session {
        async function get_current_user_id() {
            const now = Date.now() // 提前取 now 的值
            const session_token = read_session_token(req)
            if (session_token === null)
                return null
            const doc = await app_db.session.findOne({ session_token })
            if (doc === null
                || now - doc.create_at.getTime() > session_duration_ms)
                return null
            return doc.userid
        }
        async function get_current_user() {
            const user_id = await get_current_user_id()
            if (user_id === null)
                return null

            const user = await app_db.user.findOne({ _id: user_id })
            if (!user)
                throw Error(`Session Service: user (${user_id}) not found`)
            return user
        }
        return {
            get_current_user_id,
            get_current_user,
        }
    }
}

function read_session_token(req: Request) {
    const cookie_str = req.headers.get('cookie')
    if (cookie_str === null)
        return null
    const cookie = parse_cookie(cookie_str)
    const token = cookie.session_token
    if (typeof(token) !== 'string' || token.length === 0)
        return null
    return token
}
