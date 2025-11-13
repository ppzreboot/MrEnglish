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
    }
)
