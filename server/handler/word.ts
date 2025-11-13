import { match_route } from '../utils/route.ts'

export
const route__lookup = match_route('GET', '/api/lookup',
    async (req, service, { url }) => {
        const userid = await service.session(req).check()
        const word = url.searchParams.get('word')
        if (word === null)
            return Response.json({
                error: true,
                key: 'bad request',
            })
        const [err, result] = await service.llm.lookup(word)
        if (err)
            return Response.json({
                error: true,
                key: err === 'invalid word format' ? 'bad request' : 'unknown error',
            })
        await service.word_mng.add_word(userid, word)
        return Response.json({
            error: false,
            data: result,
        })
    }
)
