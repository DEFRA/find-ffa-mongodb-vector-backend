import { findAllExampleData } from '~/src/api/example/helpers/find-all-example-data.js'
import { statusCodes } from '~/src/api/common/constants/status-codes.js'
import { log } from 'node:console'

/**
 * Example controller
 * Finds all entries in a mongodb collection
 * @satisfies {Partial<ServerRoute>}
 */
const exampleFindAllController = {
  handler: async (request, h) => {
    log('Finding all example data')
    log('db', request.db)
    const entities = await findAllExampleData(request.db)

    return h.response({ message: 'success', entities }).code(statusCodes.ok)
  }
}

export { exampleFindAllController }

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
