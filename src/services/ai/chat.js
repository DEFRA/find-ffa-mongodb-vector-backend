import { formatDocumentsAsString } from 'langchain/util/document'
import {
  ChatPromptTemplate,
  MessagesPlaceholder
} from '@langchain/core/prompts'
import {
  RunnableSequence,
  RunnablePassthrough,
  RunnableWithMessageHistory
} from '@langchain/core/runnables'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { getRetriever } from './retriever.js'
import { createChatHistory } from './chat-history.js'
import { model } from '../ai/clients/chatgpt.js'
import { similaritySearchWithScoreResults } from './similarity-search.js'
// import { vectorStore } from './vector-store.js'

const standaloneSystemPrompt = `
Given a chat history and a follow-up question, rephrase the follow-up question to be a standalone question.
Do NOT answer the question, just reformulate it if needed, otherwise return it as is.
Only return the final standalone question.
`
const ragSystemPrompt = `Answer the question based on the following context:
  <context>
    {context}
  </context>
  <question>
    {question}
  </question>
  If the answer is not in this context, please respond with "I don't know. Here is the context I was given: {context}`

async function chat(db, question, sessionId) {
  const retriever = getRetriever(db)

  const standaloneQuestionPrompt = ChatPromptTemplate.fromMessages([
    ['system', standaloneSystemPrompt],
    new MessagesPlaceholder('history'),
    ['human', '{question}']
  ])

  const questionChain = RunnableSequence.from([
    standaloneQuestionPrompt,
    model,
    new StringOutputParser()
  ])

  const retrieverChain = RunnablePassthrough.assign({
    context: questionChain.pipe(retriever).pipe(formatDocumentsAsString)
  })

  const ragPrompt = ChatPromptTemplate.fromMessages([
    ['system', ragSystemPrompt],
    new MessagesPlaceholder('history'),
    ['human', '{question}']
  ])

  const ragChain = RunnableSequence.from([
    retrieverChain,
    ragPrompt,
    model,
    new StringOutputParser()
  ])

  const withMessageHistory = new RunnableWithMessageHistory({
    runnable: ragChain,
    getMessageHistory: () => createChatHistory(db, sessionId),
    inputMessagesKey: 'question',
    historyMessagesKey: 'history'
  })

  const response = await withMessageHistory.invoke(
    { question },
    { configurable: { sessionId } }
  )
  const references = await similaritySearchWithScoreResults(db, question)

  return { question, answer: response, sessionId, references }
}

export { chat }
