import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { session_manager } from '#service/auth'

export
async function POST(request: Request) {
	const cookie_store = await cookies()
	const session_token = cookie_store.get('session_token')?.value

	if (session_token)
		session_manager.delete(session_token)

	// 如果是表单提交（从 Server Component 页面），重定向回来源页面或首页
	// 检查 Content-Type 或 Accept 头来区分 API 调用和表单提交
	const content_type = request.headers.get('content-type') || ''
	if (content_type.includes('application/x-www-form-urlencoded')) {
		const response = NextResponse.redirect(new URL('/', request.url))
		response.cookies.delete('token')
		return response
	}

	const response = NextResponse.json({ success: true })
	response.cookies.delete('token')
	return response
}
