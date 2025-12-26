import { I_c } from '@biz/s/schema'
import { layout, respond_html } from '@ppz/clite/server'
import { get_github_login_url } from '@ppz/oauth-login/github'
import clite_meta from '../../.clite/.meta.ts'

export
const login_controller: I_c = ctx =>
	respond_html(
		layout({
			clite_meta,
			title: 'MrEnglish - 登录',
			head: '',
			body:
				`<a class="en-font"
					href="${get_github_login_url(ctx.service.env.github_oauth_client_id)}"
					style="position: absolute; top: 35%; left: 50%; transform: translate(-50%, -50%)"
				>Login MrEnglish with GitHub</a>`
		})
	)
