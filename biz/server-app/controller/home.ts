import type { ObjectId } from 'mongodb'
import { respond_page } from '@biz/s/response'
import { I_c } from '@biz/s/schema'
import { I_page_opts__home, pages } from '@biz/common/page'
import { is_valid_en_phrase } from '@biz/common/util'
import { format_request_input } from '@biz/s/throw'
import { str2obj_id } from '@biz/s/util'
import clite_meta from '../.clite/.meta.ts'
import { throw_login } from './_inner/throw-login.ts'

export
const home_controller: I_c = async ctx => {
    const userid = await throw_login(ctx)
    let word = ctx.url.searchParams.get('q')
    const r = (opts: I_page_opts__home) =>
        respond_page({
            clite_meta,
            page_meta: pages.home,
            opts,
        })

    // 获取页面，不查单词
    if (word === null)
        return r({ type: 'empty' })
    word = word.trim()
    if (word === '')
        return r({ type: 'empty' })

    // 单词（或短语）不合法
    if (!is_valid_en_phrase(word))
        return r({
            type: 'not found',
            word,
        })

    const result = await ctx.service.lookup.full(word)
    // 没查到
    if (result === null)
        return r({
            type: 'not found',
            word,
        })

    
    return r({
        type: 'normal',
        word,
        result,
        record: await ctx.service.word.add_vocabulary_and_get_star(userid, result.ecdict.word),
    })
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
    await ctx.service.word.star(word_oid, userid, star)
    return Response.json({ error: false, data: null })
}
