import z from 'zod'
import { ObjectId } from 'mongodb'

import { pages } from '@biz/common/page'
import { format_request_query } from '@biz/s/throw'
import { respond_page } from '@biz/s/response'
import { layout } from '@ppz/clite/server'
import { I_c } from '@biz/s/schema'

import { throw_login } from '../_inner/throw-login.ts'
import clite_meta from '../../.clite/.meta.ts'

export
const controller__trans_page: I_c = async ctx => {
	const userid = await throw_login(ctx)
	const chatid = format_request_query<ObjectId | null>('trans_chat_page', () => {
		const chatid = ctx.url.searchParams.get('id')
		if (chatid === null)
			return [true, null]
		return [true, new ObjectId(chatid)]
	})
	const chat = chatid === null
		? null
		: await ctx.service.llm_trans.own_chat(userid, chatid)
	return respond_page({
		page_meta: pages.trans,
		clite_meta,
		opts: {
			chat,
		},
	})
}

const schema__new_chat = z.object({
	title: z.string().min(1).max(20), 
	char_setting: z.string().min(1).max(200),
})

export
const controller__new_chat: I_c = async ctx => {
	const userid = await throw_login(ctx)
	const data = schema__new_chat.parse(
		await ctx.request.json()
	)
	return Response.json({
		error: false,
		data: await ctx.service.llm_trans.new_chat(userid, data.title, data.char_setting),
	})
}

export
const controller__new_chat_page: I_c = async ctx => {
	await throw_login(ctx)
	return new Response(
		layout({
			clite_meta,
			title: '新会话',
			head:
				`<link rel="stylesheet" href="${clite_meta.url_prefix}/${clite_meta.pages.trans_new.css}">`
			,
			body: `
				<form>
					<label>
						<span>标题</span>
						<input type="text" name="title" placeholder="请输入会话标题" required>
					</label>
					<label>
						<span>AI 人设</span>
						<textarea name="char_setting" placeholder="请输入 AI 人设" required></textarea>
					</label>
					<button type="submit">创建会话</button>
				</form>
				<script type="module">
				import { main } from '${clite_meta.url_prefix}/${clite_meta.pages.trans_new.js}'
				main(document.getElementById('app-root'))
				</script>
			`,
		}),
		{
			headers: {
				'Content-Type': 'text/html',
				'Cache-Control': 'no-store',
			}
		},
	)
}
