import { statusCodes } from '~/src/api/common/constants/status-codes.js'
import { search } from '../../../services/govuk/search.js'

const searchController = {
    handler: async (request, h) => {
        const initialMessage = request.payload.message
        const response = await search(initialMessage, 'farming_grant')
        return h.response({ message: 'success', response }).code(statusCodes.ok)
    }
  }
  
  export { searchController }