module.exports = {

  development: {
    client: 'pg',
    connection: {
      host : 'localhost',
      user : 'tu_usuario',
      password : 'tu_contraseña',
      database : 'nombre_base_datos'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  },
};
