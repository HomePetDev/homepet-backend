const enviroment = process.env.NODE_ENV || 'development';
const knexConfig = require('../knexfile');
const enviromentConfig = knexConfig[enviroment];
const knex = require('knex');
const connection = knex(enviromentConfig);

module.exports = connection;