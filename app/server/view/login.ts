import { get_github_login_url } from '@ppz/oauth-login/github'
import { layout } from './_inner/layout.ts'

export
const login_page = (github_client_id: string) =>
	layout('MrEnglish - 登录',
		`<a class="en-font"
			href="${get_github_login_url(github_client_id)}"
			style="position: absolute; top: 35%; left: 50%; transform: translate(-50%, -50%)"
		>Login MrEnglish with GitHub</a>`
	)
