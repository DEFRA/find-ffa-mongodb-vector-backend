import { searchController } from './controllers/search.js'

const search = {
  plugin: {
    name: 'search',
    register: (server) => {
      server.route([
        {
          method: 'POST',
          path: '/search',
          ...searchController
        }
      ])
    }
  }
}

export { search }
