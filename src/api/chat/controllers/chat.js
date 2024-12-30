import { statusCodes } from '~/src/api/common/constants/status-codes.js'
import { chat } from '../../../services/ai/chat.js'

const chatController = {
    handler: async (request, h) => {
        const payload = request.payload
        const initialMessage = payload.message
        console.log('initialMessage', initialMessage)
        const threadId = Date.now().toString()
        const response = await chat(request.db, initialMessage, threadId)
        return h.response({ message: 'success', response }).code(statusCodes.ok)
    }
  }
  
  export { chatController }