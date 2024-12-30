import { MongoDBAtlasVectorSearch } from '@langchain/mongodb'
import { OpenAIEmbeddings } from '@langchain/openai'
import { config } from '../../config/index.js'

function vectorStore(db) {
  const collection = db.collection(config.get('mongoCollection'))
  const indexName = config.get('mongoIndex')
  return new MongoDBAtlasVectorSearch(new OpenAIEmbeddings(), {
    collection,
    indexName,
    textKey: 'embedding_text',
    embeddingKey: 'embedding',
  })
}

export { vectorStore }
