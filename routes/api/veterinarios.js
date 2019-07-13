const router = require ('express').Router();
const query = require ('../../queries');
const tables  = require ('../../queries/tables');


// Crea un veterinario y lo relaciona con una mascota
router.post('/:id_mascota', async (req,res)=>{

  const  { cedula } = req.body.payload;
  let veterinario = await query.select(tables.veterinarios, "*", {cedula})
  if (veterinario.error ){
    veterinario = await query.insert(tables.veterinarios, req.body.payload, "*");
    if (veterinario.error){
      res.status(400).json(veterinario)
    }
  }else{
    const result = await query.insert(tables.veterinario_x_mascota, {
      cedula_vet: veterinario.cedula ,
      id_mascota: req.params.id_mascota 
    })
    if(result.error){
      await query.deleteT(tables.veterinarios, {cedula: veterinario.cedula});
      res.status(400).json({result})
    }else
      res.json({veterinario, result});
  }
});

// Obtiene todos los veterinarios
router.get('/', async (req, res)=> {
  const veterinarios = await query.select(tables.veterinarios);
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
    !updatedVeterinario.error ? res.json(updatedVeterinario) : res.status(400).json(updatedVeterinario);
  }else{
    res.status(404).json({msg:"veterinario no existe"})
  }
});

// Borra un veterinario
router.delete('/:cedula' , async(req,res)=>{

 res.json(await query.deleteT(tables.veterinarios, req.params));
  
});


module.exports = router;