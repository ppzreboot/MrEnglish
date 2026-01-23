import type { ObjectId, WithId } from 'mongodb'
import { z } from 'zod'
import { voc_api as api } from '@biz/common/api'
// import { sleep } from '@biz/common/util'
import { I_c } from '@biz/s/schema'
import { respond_page } from '@biz/s/response'
import { pages } from '@biz/common/page'
import { throw_login } from './_inner/throw-login.ts'
import clite_meta from '#/.clite/.meta.ts'
import { format_request_body } from '@biz/s/throw'
import { I_doc__vocabulary } from '@biz/common/entity'

const page_size = 25

export
const vocabulary_controller: I_c = async ctx => {
	const userid = await throw_login(ctx)
	const list = await ctx.service.word.get_vocabulary(userid, page_size, api.default_list_opts())
	return respond_page({
		page_meta: pages.vocabulary,
		clite_meta,
		opts: {
			list: list.map(format_record),
		},
	})
}

const z_paged_list_opts: z.ZodType<api.I_paged_list_opts> = z.object({
	sort: z.object({
		key: z.enum(['time', 'alphabet']),
		order: z.enum(['asc', 'desc']),
	}),
	star: z.boolean().optional(),
	last_page: z.string().optional(),
})

export
const voc_list_controller: I_c = async ctx => {
	// await sleep(5000)
	const userid = await throw_login(ctx)
	const opts = await format_request_body(ctx.request, z_paged_list_opts)
	const list = await ctx.service.word.get_vocabulary(userid, page_size, opts)
	return Response.json({
		error: 0,
		data: list.map(format_record),
	})
}

const format_record = (record: WithId<I_doc__vocabulary<ObjectId, Date>>): api.I_record =>
	({
		id: record._id.toString(),
		word: record.word,
		star: record.star,
	})
