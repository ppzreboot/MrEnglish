import { I_c } from '@biz/s/schema'
import { respond_page } from '@biz/s/response'
import { pages } from '@biz/common/page'
import { throw_login } from './_inner/throw-login.ts'
import clite_meta from '#/.clite/.meta.ts'

export
const setting_controller: I_c = async ctx => {
	await throw_login(ctx)
	return respond_page({
		page_meta: pages.setting,
		clite_meta,
		opts: null,
	})
}
