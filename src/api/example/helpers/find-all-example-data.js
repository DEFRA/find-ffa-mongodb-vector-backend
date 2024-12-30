import { log } from 'node:console'

/**
 * Database helper. Returns all objects stored in the example-data collection in mongodb.
 * See src/server/api/common/helpers/mongodb.js for an example of how the indexes are created for this collection.
 * @param { Db } db
 * @returns {Promise<WithId<Document>[]>}
 */
function findAllExampleData(db) {
  log('Finding all example data')
  log('db', db)
  const cursor = db.collection('documents').find({}, { projection: { _id: 0 } })

  return cursor.toArray()
}

export { findAllExampleData }

/**
 * @import { Db, WithId, Document } from 'mongodb'
 */
