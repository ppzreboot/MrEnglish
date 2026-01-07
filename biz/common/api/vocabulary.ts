import z from 'zod'
import type { I_x_paged_list_opts } from './_util.ts'

export
interface I_record {
	id: string
	word: string
	star: boolean
}

export
type I_sort_key = 'time' | 'alphabet'

export
interface I_sort {
	key: I_sort_key
	order: 'asc' | 'desc'
}

export
interface I_list_opts {
	sort: I_sort
	/** true: 已收藏; false: 未收藏; undefined: 全部 */
	star?: boolean
}

export
type I_paged_list_opts = I_list_opts & I_x_paged_list_opts

export
const z_paged_list_opts: z.ZodType<I_paged_list_opts> = z.object({
	sort: z.object({
		key: z.enum(['time', 'alphabet']),
		order: z.enum(['asc', 'desc']),
	}),
	star: z.boolean().optional(),
	last_page: z.string().optional(),
})

export
const default_list_opts: I_list_opts = {
	sort: {
		key: 'time',
		order: 'asc',
	},
}
