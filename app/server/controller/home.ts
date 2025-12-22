import type { ObjectId } from 'mongodb'
import { is_valid_en_phrase } from '@mr-english/util'
import { I_c } from '@mr-english-server/schema'
import { throw_bad_request, SUCCESS, format_request_input } from '@mr-english-server/throw'
import { str2obj_id } from '@mr-english-server/util'
import { home_page } from '../view/home/mod.ts'
import { respond_html } from '../utils/respond.ts'
import { throw_login } from './_inner/throw-login.ts'

export
const home_controller: I_c = async ctx => {
    const userid = await throw_login(ctx)
    const word = ctx.url.searchParams.get('q')
    if (word === null)
        return respond_html(home_page())

    const result = await ctx.service.lookup.full(word)
    const star = result === null
        ? false
        : await ctx.service.word_mng.add_history_and_get_star(userid, result.ecdict.word)

    return respond_html(
        home_page({ word, star, lookup_result: result })
    )
}

export
const star_controller: I_c = async ctx => {
    const userid = await throw_login(ctx)
    const word = ctx.url.searchParams.get('word')
    const star = ctx.url.searchParams.get('star')
    await throw_bad_request('star word', async () => {
        if (word === null || !is_valid_en_phrase(word)
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

export
const word_list_controller: I_c = async ctx => {
    const userid = await throw_login(ctx)
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
    const list = await ctx.service.word_mng.get_history(userid, 50, last)
    return Response.json({
        error: false,
        data: list.map(item => ({
            ...item,
            last_lookup_at: item.last_lookup_at.getTime(),
            first_lookup_at: item.first_lookup_at.getTime(),
        })),
    })
}
