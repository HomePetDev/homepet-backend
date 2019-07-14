const router = require ('express').Router();
const query = require ('../../queries');
const { selectAll, findByCI } = require('../../queries/clientes');
const tables  = require ('../../queries/tables');

router.post('/', async (req,res)=>{
  const { cedula } = req.body.payload;
  const usuario = await query.select(tables.usuarios, "*", {cedula_id:cedula});
  if (!usuario.error && usuario.id_acceso === 1 ){
    const cliente = await query.insert(tables.clientes, req.body.payload, "*");
    if (cliente.error ) 
      res.status(400).json(cliente)
    else{
      const update = await query.update(tables.usuarios, {cedula_id : usuario.cedula_id}, {id_acceso: 2});
      if (update.error){
        await query.deleteT(tables.clientes, {cedula});
        res.status(400).json({error:"No se pudo añadir el cliente"});
      }else
        res.json(cliente);
    } 
  }else{ res.json({error:"El cliente no existe como usuario o tiene rol asignado"})}
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
    const userUpdated = query.update(tables.usuarios,{cedula_id:cedula}, {id_acceso:1}, "*");
    if (userUpdated.error){
      res.json(userUpdated);
    }else{
      res.json(1);
    }
  }else{
    res.json(0);
  }
});


module.exports = router;