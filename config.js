const { Pool } = require('pg')
// change password when necessary
const isProduction = process.env.NODE_ENV === 'production'

let pool = null;
if (isProduction) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL, ssl: {
      rejectUnauthorized: false,
    }
  })
} else {
  pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'eshoppw',
    password: 'jb12',
    port: 5432
  })
}

module.exports = { pool }