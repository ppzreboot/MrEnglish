import type { ObjectId } from 'mongodb'
import { is_valid_en_phrase } from '@mr-english/util'
import { I_c } from '@mr-english-server/schema'
import { format_request_input } from '@mr-english-server/throw'
import { str2obj_id } from '@mr-english-server/util'
import { home_page } from '../view/home/mod.ts'
import { respond_html } from '../utils/respond.ts'
import { throw_login } from './_inner/throw-login.ts'

export
const home_controller: I_c = async ctx => {
    const userid = await throw_login(ctx)
    let word = ctx.url.searchParams.get('q')

    // 获取页面，不查单词
    if (word === null)
        return respond_html(home_page({ type: 'empty' }))
    word = word.trim()
    if (word === '')
        return respond_html(home_page({ type: 'empty' }))

    // 单词（或短语）不合法
    if (!is_valid_en_phrase(word))
        return respond_html(home_page({
            type: 'word not found',
            word,
        }))

    const result = await ctx.service.lookup.full(word)
    // 没查到
    if (result === null)
        return respond_html(home_page({
            type: 'word not found',
            word,
        }))

    return respond_html(
        home_page({
            type: 'normal',
            word,
            record: await ctx.service.word_mng.add_history_and_get_star(userid, result.ecdict.word),
            lookup_result: result,
        })
    )
}

export
const star_controller: I_c = async ctx => {
    const userid = await throw_login(ctx)
    const { word_oid, star } = await format_request_input<{ word_oid: ObjectId, star: boolean}>('star word', () => {
        const word = ctx.url.searchParams.get('word')
        const star = ctx.url.searchParams.get('star')
        
        let word_oid: ObjectId | null = null
        if ((word === null || (word_oid = str2obj_id(word)) === null)
         || (star !== '0' && star !== '1'))
            return [false, { word, star }]
        return [true, { word_oid, star: star === '1' }]
    })
    await ctx.service.word_mng.star(word_oid, userid, star)
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
