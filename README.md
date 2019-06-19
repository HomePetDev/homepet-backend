# Home Pet App API Backend

## Instalacion
```sh
  cd homepet-backend
  npm install
  npm run dev 
  # El servidor Corre en http://localhost:3000
```
### Configuracion de conexion a la base de datos
Modificar el archivo en `./db/index.js` de acuerdo a su configuracion de conexion
```sh
  const pool = new Pool({
    user: 'usuario',
    host: 'localhost',
    database: 'nombre_base_datos',
    password: 'contraseña',
    port: 5432,
})

```
