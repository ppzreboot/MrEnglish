import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { session_manager } from '#service/auth'
import { clone_url } from '#service/util'

export
async function POST(request: NextRequest) {
	const cookie_store = await cookies()
	const session_token = cookie_store.get('session_token')?.value

	if (session_token)
		await session_manager.delete(session_token)
	else
		return NextResponse.json({ error: 'No session token found' }, { status: 400 })

	// 如果是表单提交（从 Server Component 页面），重定向回来源页面或首页
	// 检查 Content-Type 或 Accept 头来区分 API 调用和表单提交
	let response: NextResponse
	if (request.headers.get('content-type')?.includes('application/x-www-form-urlencoded')) {
		response = NextResponse.redirect(clone_url(request))
	} else {
		response = NextResponse.json({ success: true })
	}

	response.cookies.delete('session_token')
	return response
}
