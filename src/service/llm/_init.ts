import OpenAI from "openai"

const llm_key = process.env.llm_key
if (llm_key === undefined || llm_key.length === 0)
    throw new Error('ENV llm_key is not set')

export
const llm_client = new OpenAI({
    apiKey: llm_key,
    baseURL: 'https://api.x.ai/v1',
    timeout: 60_000,
})
