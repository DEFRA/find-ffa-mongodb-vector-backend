import { vectorSearchController } from './controllers/vector-search.js'

const vectorSearch = {
  plugin: {
    name: 'vector-search',
    register: (server) => {
      server.route([
        {
          method: 'POST',
          path: '/vector-search',
          ...vectorSearchController
        }
      ])
    }
  }
}

export { vectorSearch }
