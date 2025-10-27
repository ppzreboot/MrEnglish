import { search_word } from '@/service/llm/word'

export
async function GET(req: Request) {
    const url = new URL(req.url)
    const word = url.search
    if (word.length === 0)
        return new Response('Query parameter "word" is required', { status: 400 })
    return Response.json(
        await search_word(word)
    )
}
