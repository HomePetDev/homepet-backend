
const express = require('express');

const router = express.Router();

const homepets = require('./homepets');
const usuarios = require('./usuarios');
const gerentes = require('./gerentes');
const empleados = require('./empleados');
router.use('/homepets', homepets);
router.use('/usuarios', usuarios);
router.use('/gerentes', gerentes);
router.use('/empleados', empleados);

module.exports = router;