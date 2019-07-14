
const express = require('express');

const router = express.Router();

const homepets = require('./homepets');
const usuarios = require('./usuarios');
const gerentes = require('./gerentes');
const empleados = require('./empleados');
const animal = require('./animal');
const clientes = require('./clientes');
const servicios = require('./servicios');
const actividades = require('./actividades');
const mascotas = require('./mascotas');
const razas = require('./razas');
const veterinarios = require('./veterinarios');
const almacenes = require('./almacenes');
const productos = require('./productos');
const fichas = require('./fichas');

//  End points
router.use('/homepets', homepets);
router.use('/usuarios', usuarios);
router.use('/gerentes', gerentes);
router.use('/empleados', empleados);
router.use('/animales', animal);
router.use('/animales', animal);
router.use('/clientes', clientes);
router.use('/servicios', servicios);
router.use('/actividades', actividades);
router.use('/mascotas', mascotas);
router.use('/razas', razas);
router.use('/veterinarios', veterinarios);
router.use('/almacenes', almacenes);
router.use('/productos', productos);
router.use('/fichas', fichas);

module.exports = router;