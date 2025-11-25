import { simple_match } from '@ppz-http/router'
import { I_app_service } from '@mr-english/app-model'
import { check_en_word } from '../utils/type-checker.ts'

export
const route__lookup = simple_match<I_app_service>({
    method: 'GET',
    path: '/api/lookup',
    async handler(ctx) {
        // await ctx.service.session(ctx.request).check()
        const word = ctx.url.searchParams.get('word')
        if (word === null || !check_en_word(word))
            return Response.json({
                error: true,
                key: 'bad request',
            })
        const result = await ctx.service.lookup(word)
        return Response.json({
            error: false,
            data: {
                is_valid: result !== null,
                detail: result,
            }
        })
    },
})
