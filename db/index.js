
const { Pool } = require('pg')

// Configuracion de conexion a la base de datos
const pool = new Pool({
  user: 'FLX',
  host: 'localhost',
  database: 'prueba',
  password: 'flx',
  port: 5432,
})

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}