import { get_github_login_url } from '@ppz/oauth-login/github'
import { layout } from './_inner/layout.ts'
import { h, s } from './_inner/interpolation.ts'

export
const login_page = (github_client_id: string) =>
	layout('MrEnglish - 登录',
		h`<a class="en-font"
			href="${s(get_github_login_url(github_client_id))}"
			style="position: absolute; top: 35%; left: 50%; transform: translate(-50%, -50%)"
		>Login MrEnglish with GitHub</a>`
	)
