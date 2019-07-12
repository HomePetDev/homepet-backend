const router = require ('express').Router();
const query = require ('../../queries');
const { selectAll, findByCI } = require('../../queries/clientes');
const tables  = require ('../../queries/tables');

router.post('/', async (req,res)=>{
    const cliente = await query.insert(tables.clientes, req.body.payload, "*");
    cliente.error ? res.status(400).json(cliente) : res.json(cliente);
});

// Obtiene todos los clientes
router.get('/', async (req, res)=> {
  const clientes = await selectAll();
  clientes.error ? res.status(404).json(clientes) : res.json(clientes);
})

// Obtiene un cliente con una cedula dada
router.get('/:cedula', async (req, res)=>{
  const cliente = await findByCI(req.params.cedula);
  cliente.error ? res.status(404).json(cliente) : res.json(cliente);
})


// Actualiza la informacion de un cliente
router.patch('/:cedula' , async(req,res)=>{
  const cliente = await query.select(tables.clientes, "*" , req.params);
  if ( cliente ){
    const updatedCliente = await query.update(tables.clientes, req.params,req.body.payload, "*");
    !updatedCliente.error ? res.json(updatedCliente) : res.status(400).json(updatedCliente);
  }else{
    res.status(404).json({msg:"cliente no existe"})
  }
});

// Borra un cliente
router.delete('/:cedula' , async(req,res)=>{

  const cedula =  req.params.cedula
  if (await query.deleteT(tables.clientes,req.params)){
    const userUpdated = query.update(usuarios,{cedula_id:cedula}, {id_acceso:1}, "*");
    if (userUpdated.error){
      res.json(userUpdated);
    }else{
      res.json(1);
    }
  }
});


module.exports = router;