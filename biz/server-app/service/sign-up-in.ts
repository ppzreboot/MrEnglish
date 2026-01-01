import type { I_app_db } from '@biz/s/schema'
import type { ObjectId } from 'mongodb'

export
function init_service__sign_up_in(app_db: I_app_db) {
    return async function(provider: 'github', oauth_id: string): Promise<string> {
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
            if (user === null)
                throw new Error('user not found during sign-in')
            userid = user._id
            // update session on sign-in
            const result = await app_db.session.updateOne(
                { userid },
                { $set: {
                    session_token,
                    create_at: now,
                }},
            )
            if (result.matchedCount !== 1) {
                console.error('error on updating session on sign-in', result)
                throw Error('no session found on sign-in')
            }
        }
        console.log('sign up/in successful', { userid })
        return session_token
    }
}
