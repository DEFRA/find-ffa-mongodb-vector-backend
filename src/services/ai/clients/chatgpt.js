import { ChatOpenAI } from "@langchain/openai"
import { config } from '../../../config/index.js'

const model = new ChatOpenAI({
    apiKey: config.get('openAIKey'),
    modelName: "gpt-4o-mini",
    temperature: 0.7,
})

export { model }