const pg = require('pg')

let databaseName = "weekend_to_do_app"

if (process.env.NODE_ENV === 'test') {
  databaseName = 'prime_testing'
}

const pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: databaseName,
    allowExitOnIdle: true 
})

module.exports = pool
