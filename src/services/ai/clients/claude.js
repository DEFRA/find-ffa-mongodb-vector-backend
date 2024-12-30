import { ChatAnthropic } from '@langchain/anthropic'

const model = new ChatAnthropic({
  model: 'claude-3-5-sonnet-20240620',
  temperature: 0
})

export { model }