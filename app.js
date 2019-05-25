const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv/config');

// Importando rutas
const auth = require('./routes/auth'); 
const users = require('./routes/api');
// Importando middlewares
const { notFound , errorHandler } = require('./middlewares');

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/' , (req, res) =>{
  res.json({
    msg: 'Hello World Home Pet'
  })
})

app.use('/api', users);
app.use('/api/auth', auth);

app.use(notFound);
app.use(errorHandler)


module.exports = app;
