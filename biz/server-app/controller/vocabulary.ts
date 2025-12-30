import { default_voc_list_opts } from '@biz/common/api'
import { I_c } from '@biz/s/schema'
import { respond_page } from '@biz/s/response'
import { pages } from '@biz/common/page'
import { throw_login } from './_inner/throw-login.ts'
import clite_meta from '#/.clite/.meta.ts'

export
const vocabulary_controller: I_c = async ctx => {
	const userid = await throw_login(ctx)
	const list = await ctx.service.word.get_vocabulary(userid, 5, default_voc_list_opts)
	return respond_page({
		page_meta: pages.vocabulary,
		clite_meta,
		opts: {
			list: list.map(item => ({
				id: item._id.toString(),
				word: item.word,
				star: item.star,
			})),
		},
	})
}
