import z from 'zod'

import { pages } from '@biz/common/page'
import { respond_page } from '@biz/s/response'
import { I_c } from '@biz/s/schema'

import { throw_login } from '../_inner/throw-login.ts'
import clite_meta from '../../.clite/.meta.ts'

export
const controller__trans_page: I_c = async ctx => {
	const userid = await throw_login(ctx)
	return respond_page({
		page_meta: pages.trans,
		clite_meta,
		opts: {},
	})
}

const schema__new_chat = z.object({
	title: z.string().min(1).max(20), 
	prompt: z.string().min(1).max(200),
})

export
const controller__new_chat: I_c = async ctx => {
	const userid = await throw_login(ctx)
	const data = schema__new_chat.parse(
		await ctx.request.json()
	)
	return Response.json({
		error: false,
		data: await ctx.service.llm_trans.new_chat(userid, data.title, data.prompt),
	})
}
