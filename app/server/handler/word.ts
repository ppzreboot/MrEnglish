import { simple_match } from '@mr-english-server/router'
import { I_app_service } from '@mr-english-server/schema'
import { throw_bad_request, SUCCESS, format_request_input } from '@mr-english-server/throw'
import { str2obj_id } from '@mr-english-server/util'
import type { ObjectId } from 'mongodb'
import { check_en_word } from '../utils/type-checker.ts'

export
const route__lookup = simple_match<I_app_service>({
    method: 'GET',
    path: '/api/lookup',
    async handler(ctx) {
        const userid = await ctx.service.session(ctx.request).check()
        const word = ctx.url.searchParams.get('word')
        throw_bad_request('lookup', () => {
            if (word === null || !check_en_word(word))
                return word
            return SUCCESS
        })
        const result = await ctx.service.lookup.full(word as string)
        if (result === null)
            return Response.json({ error: false, data: null })

        const star = await ctx.service.word_mng.add_history_and_get_star(userid, result.ecdict.word)
        return Response.json({ error: false, data: { result, star } })
    },
})

export
const route__star_word = simple_match<I_app_service>({
    method: 'POST',
    path: '/api/word/star',
    async handler(ctx) {
        const userid = await ctx.service.session(ctx.request).check()
        const word = ctx.url.searchParams.get('word')
        const star = ctx.url.searchParams.get('star')
        await throw_bad_request('star word', async () => {
            if (word === null || !check_en_word(word)
                // @ts-ignore:
                || !['1', '0'].includes(star)
                || !(await ctx.service.word_mng.is_in_ecdict(word as string))
            )
                return { word, star }
            return SUCCESS
        })
        await ctx.service.word_mng.star(userid, word as string, star === '1')
        return Response.json({ error: false, data: null })
    }
})

export
const route__get_history = simple_match<I_app_service>({
    method: 'GET',
    path: '/api/word/history',
    async handler(ctx) {
        const userid = await ctx.service.session(ctx.request).check()
        type I_input = null | { update_at: Date, id: ObjectId }
        const last = format_request_input<I_input>('get lookup history', () => {
            const update_at = ctx.url.searchParams.get('update_at')
            const id = ctx.url.searchParams.get('id')
            if (update_at === null && id === null)
                return [true, null]
            if (update_at !== null && id !== null) {
                const _u = Number(update_at)
                if (!Number.isSafeInteger(_u))
                    return [false, { update_at, id }]
                const u = new Date(_u)
                const i = str2obj_id(id)
                if (i === null)
                    return [false, { update_at, id }]
                return [true, { update_at: u, id: i }]
            }
            return [false, 'all null or all not null']
        })
        const list = await ctx.service.word_mng.get_history(userid, 30, last)
        return Response.json({
            error: false,
            data: list.map(item => ({
                ...item,
                last_lookup_at: item.last_lookup_at.getTime(),
                first_lookup_at: item.first_lookup_at.getTime(),
            })),
        })
    }
})
