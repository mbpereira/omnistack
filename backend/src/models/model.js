const knex = require('knex')
const { Model } = require('objection')

const connection = knex({
    client: 'pg',
    connection: process.env.CONNECTION_STRING
})

Model.knex(connection)

module.exports = Model