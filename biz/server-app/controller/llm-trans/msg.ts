import { ObjectId } from 'mongodb'
import z from 'zod'
import { I_c } from '@biz/s/schema'
import { throw_login } from '../_inner/throw-login.ts'

const schema__new_msg = z.object({
	chat_id: z.string(), 
	msg: z.string().min(1).max(200),
})

export
const controller__new_msg: I_c = async ctx => {
	const userid = await throw_login(ctx)
	const data = schema__new_msg.parse(
		await ctx.request.json()
	)
	const chat = await ctx.service.llm_trans.own_chat(new ObjectId(userid), new ObjectId(data.chat_id))
	if (chat === null)
		return Response.json({
			error: false, // 表示前后端通信成功
			data: {
				error: 'chat 不存在（或者已被删除）'
			},
		})

	const result_stream = ctx.service.llm_trans.new_msg(chat, data.msg)
	const response_body = new ReadableStream({
		async start(controller) {
			const te = new TextEncoder()
			try { // await ctx.service.llm_trans.new_msg
				for await (const chunk of result_stream)
					controller.enqueue(te.encode(chunk))
				controller.close()
			} catch(err) {
				console.error(err)
			}
		}
	})
	return new Response(response_body, {
		headers: {
			'Content-Type': 'text/event-stream',
		}
	})
}
