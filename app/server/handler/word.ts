import { simple_match } from '@mr-english-server/router'
import { I_app_service } from '@mr-english-server/schema'
import { throw_bad_request, SUCCESS } from '@mr-english-server/throw'
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
