import z from 'zod'
import { I_c } from '@biz/s/schema'
import { throw_login } from '../_inner/throw-login.ts'

const schema__create_chat = z.object({
	title: z.string().min(1).max(20), 
	prompt: z.string().min(1).max(200),
})

export
const controller__create_chat: I_c = async ctx => {
	const userid = await throw_login(ctx)
	const data = schema__create_chat.parse(
		await ctx.request.json()
	)
	return Response.json({
		error: false,
		data: await ctx.service.llm_trans.new_chat(userid, data.title, data.prompt),
	})
}
