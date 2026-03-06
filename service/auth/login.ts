import { user_service } from '#service/user'
import { type I_oauth2_provider_key, get_oauth2_provider } from './oauth2'
import { session_manager } from './session'
import { verify_email_code } from '#service/email'

export
async function oauth2_login(provider: I_oauth2_provider_key, code: string) {
	// 从 oauth2 获取用户信息
	const provider_id = await get_oauth2_provider(provider).get_user_info(code)
	// 从数据库中获取用户信息
	const user = await user_service.retrieve_by_provider({
		provider,
		provider_id,
	})
	// 创建会话
	return await session_manager.create(user.id)
}

export
async function email_login(code: string, email: string) {
	// 验证验证码
	const ok = await verify_email_code(code, email)
	if (!ok)
		// 有可能是用户输入错误，这是正常现象，用 body 而不是 status code 表达异常
		return { error: '验证码错误或已过期' }
	// 从数据库中获取用户信息
	const user = await user_service.get_by_email(email)
	// 创建会话
	return {
		error: null,
		token: await session_manager.create(user!.id),
	}
}
