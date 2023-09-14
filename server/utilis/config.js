/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Brooke Taylor
 *  Date: 09/14/2023
 *  Description: config
 */

'use strict'

const {
  DB_USERNAME = 'bcrs_user',
  DB_PASSWORD = 's3cret',
  DB_NAME = 'bcrsDB'
} = process.env

const CONFIG = {
  DB_URL: `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@bellevueuniversity.kqpr8ra.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
  DB_NAME: DB_NAME
}

module.exports = CONFIG