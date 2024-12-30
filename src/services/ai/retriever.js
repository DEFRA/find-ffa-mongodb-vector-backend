import { vectorStore } from './vector-store.js'

function getRetriever(db) {
  return vectorStore(db).asRetriever({
    // searchType: 'mmr',
    // searchKwargs: {
    //  fetchK: 10,
    //  lambda: 0.1
    // }
    searchType: 'similarity',
    k: 5
  })
}

export { getRetriever }
