const router = require('express').Router();
const query = require('../../queries');
const tables = require('../../queries/tables');

const returning = "*"

// Inserta un nuevo gerente
router.post('/' , async (req,res)=>{
  const gerente = await query.insert(tables.gerentes, req.body.payload, returning);
  !gerente.detail ? res.json(gerente) : res.status(400).json(gerente);
})

// Obtiene todos los gerentes
router.get('/', async (req, res)=> {
  const gerentes = await query.select(tables.gerentes, returning);
  !gerentes.detail ? res.json(gerentes) : res.status(500).json(gerentes)
})

router.get('/:cedula', async (req, res)=>{
  const gerente = await query.select(tables.gerentes, returning , req.params);
  gerente ? res.json(gerente) : res.status(400).json(gerente);
})

router.patch('/:cedula' , async(req,res)=>{
  const gerente = await query.select(tables.gerentes, "*" , req.params);
  if (gerente){
    const updatedGerente = await query.update(tables.gerentes, req.params,req.body.payload, returning);
    !updatedGerente.name ? res.json(updatedGerente) : res.status(400).json(updatedGerente);
  }else{
    res.status(404).json({msg:"gerente no existe"})
  }
});

router.delete('/:cedula' , async(req,res)=>{
  res.json(await query.deleteT(tables.gerentes, req.params));
});

// rutas extras



module.exports = router;