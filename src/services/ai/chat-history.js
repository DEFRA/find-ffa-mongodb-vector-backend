import { MongoDBChatMessageHistory } from '@langchain/mongodb'

function createChatHistory(db, sessionId) {
    console.log('Creating chat history with session ID:', sessionId)
    const collectionHistory = db.collection('document_history')
    return new MongoDBChatMessageHistory({
        collection: collectionHistory,
        sessionId: sessionId
    })
}

export { createChatHistory }
