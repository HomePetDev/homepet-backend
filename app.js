const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv/config');

// Importando rutas
const auth = require('./routes/api/auth'); 
const { usuarios, homepets } = require('./routes/api');

// Importando funciones middlewares
const { notFound , errorHandler } = require('./middlewares');

const app = express(); // Inicializando express

// middlewares de desarrollo
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//  Rutas de la API comienzan aqui
app.get('/' , (req, res) =>{
  res.json({
    msg: 'Hello World Home Pet'
  })
})

app.use('/api/usuarios', usuarios);
app.use('/api/homepets', homepets);
app.use('/api/auth', auth);

// manejando errores
app.use(notFound);
app.use(errorHandler)


module.exports = app;
