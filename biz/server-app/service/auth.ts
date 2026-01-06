import type { I_app_db, I_service__auth } from '@biz/s/schema'
import type { ObjectId } from 'mongodb'

export
function init_service__auth(app_db: I_app_db): I_service__auth {
    return {
        async sign_up_in(provider: 'github', oauth_id: string): Promise<string> {
            const user_oauth = await app_db.user_oauth.findOne({
                provider,
                oauth_id,
            })
            let userid: ObjectId
            const now = new Date()
            const session_token = crypto.randomUUID()
            if (user_oauth === null) {
                // sign up
                const inserted_user = await app_db.user.insertOne({
                    is_friend: false,
                    create_at: now,
                    update_at: now,
                })
                await app_db.user_oauth.insertOne({
                    provider,
                    oauth_id,
                    userid: inserted_user.insertedId,
                    create_at: now,
                })
                userid = inserted_user.insertedId
                // insert session on sign-up
                await app_db.session.insertOne({
                    userid,
                    session_token,
                    create_at: now,
                })
            } else {
                // sign in
                const user = await app_db.user.findOne({
                    _id: user_oauth.userid,
                })
                userid = user!._id
                // update session on sign-in
                const result = await app_db.session.updateOne(
                    { userid },
                    { $set: {
                        session_token,
                        create_at: now,
                    }},
                )
                if (result.matchedCount !== 1)
                    throw Error(`no session found on sign-in for user ${userid}`)
            }
            console.log('sign up/in successful', { userid })
            return session_token
        },
        async signout(session_token: string) {
            // 如果用户在别的设备上登录过，那么此处“被更新的 doc 数”为 0
            await app_db.session.updateOne({
                session_token,
            }, {
                $set: {
                    create_at: new Date(0),
                }
            })
        },
    }
}
