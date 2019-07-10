const router = require('express').Router();
const tables = require('../../queries/tables');
const query = require('../../queries');

router.get ('/', async (req, res)=>{

  const animales = await query.select(tables.animal, "*");
  !animales.error ? res.json(animales) : res.status(400).json(animales);
 
})

module.exports = router;