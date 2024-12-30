import { statusCodes } from '~/src/api/common/constants/status-codes.js'
import { similaritySearchWithScoreResults } from '../../../services/ai/similarity-search.js'

const vectorSearchController = {
  handler: async (request, h) => {
    const initialMessage = request.payload.message
    const response = await similaritySearchWithScoreResults(
      request.db,
      initialMessage
    )
    return h.response({ message: 'success', response }).code(statusCodes.ok)
  }
}

export { vectorSearchController }
