const router = require ('express').Router();
const query = require ('../../queries');
const tables  = require ('../../queries/tables');

router.post('/', async (req,res)=>{
  const veterinario = await query.insert(tables.veterinarios, req.body.payload, "*");
  veterinario.error ? res.status(400).json(veterinario) : res.json(veterinario);
});

// Obtiene todos los veterinarios
router.get('/', async (req, res)=> {
  const veterinarios = await selectAll();
  veterinarios.error ? res.status(404).json(veterinarios) : res.json(veterinarios);
})

// Obtiene un veterinario con una cedula dada
router.get('/:cedula', async (req, res)=>{
  const veterinario = await findByCI(req.params.cedula);
  veterinario.error ? res.status(404).json(veterinario) : res.json(veterinario);
})


// Actualiza la informacion de un veterinario
router.patch('/:cedula' , async(req,res)=>{
  const veterinario = await query.select(tables.veterinarios, "*" , req.params);
  if ( veterinario ){
    const updatedVeterinario = await query.update(tables.veterinarios, req.params,req.body.payload, "*");
    !updatedVeterinario.name ? res.json(updatedVeterinario) : res.status(400).json(updatedVeterinario);
  }else{
    res.status(404).json({msg:"veterinario no existe"})
  }
});

// Borra un veterinario
router.delete('/:cedula' , async(req,res)=>{

 res.json(await query.deleteT(tables.veterinarios, req.params));
  
});


module.exports = router;