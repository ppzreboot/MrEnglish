import { I_llm_client_opts } from '../../type.ts'

export
async function search_word(llm_opts: I_llm_client_opts, word: string) {
    const response = await fetch(llm_opts.base_url + '/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${llm_opts.api_key}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'grok-4-fast-reasoning',
            response_format,
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
        }),
    })
    const data = await response.json()
    return JSON.parse(data.choices[0].message.content)
}

const response_format = {
    type: 'json_schema',
    json_schema: {
        name: '"English word" search result',
        strict: true,
        schema: {
            $schema: 'http://json-schema.org/draft-07/schema#',
            type: 'object',
            additionalProperties: false,
            required: ['user_input', 'is_valid_word', 'details'],
            properties: {
                is_valid_word: {
                    type: 'boolean',
                    description: 'Indicates if the provided string is a valid English word',
                },
                details: {
                    description: 'Details about the word if it is valid; null otherwise',
                    anyOf: [
                        {
                            type: 'null'
                        },
                        {
                            type: 'object',
                            additionalProperties: false,
                            required: ['explain'],
                            properties: {
                                explain: {
                                    type: 'string',
                                    description: 'Explain the word like in a dictionary entry in markdown format',
                                },
                            },
                        },
                    ],
                },
            },
        }
    }
}
