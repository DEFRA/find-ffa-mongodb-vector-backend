import { url } from 'inspector'
import { vectorStore } from './vector-store'

async function similaritySearchWithScoreResults (db, initialMessage) {
    const results = await vectorStore(db).similaritySearchWithScore(initialMessage, 5)
    return results.map(([doc, score]) => {
        return {
            title: doc.metadata.title,
            url: doc.metadata.baseUrl,
            score: score.toFixed(3)
        }
    })
}

export { similaritySearchWithScoreResults }
