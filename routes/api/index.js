const router = require('express').Router();
const { auth } = require('../auth/utils');
const {findById }= require('../../queries/usuario');


router.get('/user', auth, async (req, res) => {
  
  const usuario = await findById(req.id);
  res.status(200).json(usuario);
});

module.exports = router;