import { proxyFetch } from '../../api/common/helpers/proxy.js'
import { config } from '../../config/index.js'
import { createLogger } from '../../api/common/helpers/logging/logger.js'
const logger = createLogger()

const search = async (query, filterFormat) => {
  logger.info('Fetching search results from Gov UK Search API for content urls')

  const searchEndpoint = `${config.get('searchApiEndpoint')}/search.json?q=${query}&filter_format=${filterFormat}`
  logger.info(`searchEndpoint': ${searchEndpoint}`)

  const result = await proxyFetch(searchEndpoint, { method: 'GET' })
  const data = await result?.json()

  if (!data) {
    logger.error(
      'Failed to fetch search results for content urls or invalid response structure'
    )
    return {}
  }

  return data.results.map((result) => {
    return {
      title: result.title,
      url: `https://www.gov.uk${result.link}`,
      link: result.link
    }
  })
}

export { search }