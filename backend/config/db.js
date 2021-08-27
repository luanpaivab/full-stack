const config = require('../knexfile.js')
const config2 = require('../knexfile2.js')
const knex = require('knex')(config)
const knex2 = require('knex')(config2)

module.exports = { knex, knex2}
