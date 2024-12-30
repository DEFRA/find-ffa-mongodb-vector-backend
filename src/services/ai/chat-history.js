import { MongoDBChatMessageHistory } from '@langchain/mongodb'

function createChatHistory(db, sessionId) {
  const collectionHistory = db.collection('document_history')
  return new MongoDBChatMessageHistory({
    collection: collectionHistory,
    sessionId
  })
}

export { createChatHistory }
