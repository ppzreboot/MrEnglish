import { I_c } from '@mr-english-server/schema'
import { respond_html } from '../../utils/respond.ts'
import { login_page } from '../../view/login.ts'

export
const login_controller: I_c = ctx =>
	respond_html(
		login_page(ctx.service.env.github_oauth_client_id)
	)
