# Home Pet App API Backend

## Instalacion
```sh
  cd homepet-backend
  npm install
  npm run dev 
  # El servidor Corre en http://localhost:3000
```
### Variables de entorno
Para el funcionamiento de `dontenv` y de todas las claves necesarias para el desarrollo/produccion crear un archivo `.env` con los siguientes claves, un ejemplo de las claves utilizadas se encuentra en el archivo `.env.sample`
```sh
  JWT_SECRET = tu secreto baby
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
