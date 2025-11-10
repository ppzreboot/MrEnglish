import { match_route } from '../utils/route.ts'

export
const route__lookup = match_route('GET', '/api/lookup',
    async (_, service, { url }) => {
        const word = url.searchParams.get('word')
        if (word === null)
            return Response.json({
                error: true,
                key: 'bad request',
            })
        const r = /^[a-zA-Z]+(?:-[a-zA-Z]+)*(?: [a-zA-Z]+(?:-[a-zA-Z]+)*)*$/
        if (word.length > 50 || !r.test(word))
            return Response.json({
                error: false,
                data: {
                    is_valid_word: false,
                    details: null,
                },
            })
        return Response.json({
            error: false,
            data: await service.llm.lookup(word),
        })
    }
)
