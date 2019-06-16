const router = require('express').Router();
const { auth } = require('../auth/utils');
const {findById }= require('../../queries/usuario');
const {getAll }= require('../../queries/empleados');


router.get('/user', auth, async (req, res) => {
  
  const usuario = await findById(req.id);
  res.status(200).json(usuario);
});

router.get('/getallempleados', async (req, res) => {
  
  const empleados = await getAll();
  res.status(200).json(empleados);
})

module.exports = router;