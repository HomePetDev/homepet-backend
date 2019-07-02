
const router = require('express').Router();
const query = require('../../queries');
const tables = require('../../queries/tables');

const returning = ['cedula_id', 'nombre', 'direccion', 'telefono', 'fecha_reg', 'id_acceso']

// Obtiene todos los usuarios
router.get('/', async (req, res)=> {
  const usuarios = await query.select(tables.usuarios, returning);
  !usuarios.error ? res.json(usuarios) : res.status(500).json(usuarios)
})

router.get('/:cedula_id', async (req, res)=>{
  const usuario = await query.select(tables.usuarios, returning , req.params);
  usuario ? res.json(usuario) : res.status(400).json(usuario);
})


router.patch('/:cedula_id' , async(req,res)=>{
  const updatedUsuario = await query.update(tables.usuarios, req.params,req.body.payload, returning);
  !updatedUsuario.error ? res.json(updatedUsuario) : res.status(400).json(updatedUsuario);
});

router.delete('/:cedula_id' , async(req,res)=>{
  res.json(await query.deleteT(tables.usuarios, req.params));
})
module.exports = router;