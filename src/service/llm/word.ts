import { z } from 'zod'
import { llm_client } from './_init'
import { zodResponseFormat } from 'openai/helpers/zod'

const word_details_schema = z.object({
    explain: z.string().describe('Explain the word like in a dictionary entry in markdown format'),
})

const word_search_result_schema = z.object({
    user_input: z.string().describe('The original string provided by the user'),
    is_valid_word: z.boolean().describe('Indicates if the provided string is a valid English word'),
    details: word_details_schema.nullable().describe('Details about the word, if it is valid; null otherwise'),
})

export
async function search_word(word: string) {
    return await llm_client.chat.completions.parse({
        model: 'grok-4-fast-reasoning',
        messages: [
            {
                role: 'system',
                content: `The user will provide you with a string.
Your task is to determine if it is a valid English word.
If it is a valid English word, provide an explanation of its meaning.
Respond in JSON format as specified.`,
            },
            {
                role: 'user',
                content: `Teach me this word: "${word}"`,
            },
        ],
        response_format: zodResponseFormat(word_search_result_schema, 'word search result'),
    })
}
