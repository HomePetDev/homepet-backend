# Home Pet App API Backend

## Instalacion
```sh
  cd homepet-backend
  npm install
  npm run dev 
  # El servidor Corre en http://localhost:3000
```
### Variables del entorno
Para el funcionamiento de `dontenv` crear un archivo `.env` con los siguientes claves
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
