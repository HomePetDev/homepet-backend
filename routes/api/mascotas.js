const router = require('express').Router();
const query = require('../../queries');
const tables = require('../../queries/tables');
const uuid = require('uuid');

// Añade una nueva mascota con la cedula de un cliente
router.post ('/:cedula_owner', async (req, res)=>{

  const id_mascota = uuid.v4().slice(0,8) 
  const newMascota = {
    id_mascota , ...req.params, ...req.body.payload
  } 

  const mascota = await query.insert(tables.mascotas, newMascota, "*");
  mascota.error ? res.status(400).json(mascota) : res.json(mascota);  
});


// Obtener todas las mascotas 
router.get ('/', async (req,res) => {
  const mascotas = await query.select(tables.mascotas, "*");
  mascotas.error ? res.status(404).json(mascotas) : res.json(mascotas);
});

// Actualizar la informacion de una mascota
router.patch('/:id_mascota' , async(req,res)=>{
  const mascota = await query.select(tables.mascotas, "*" , req.params);
  if (!mascota.error){
    const updatedMascota = await query.update(tables.mascotas, req.params, req.body.payload, "*");
    !updatedMascota.error ? res.json(updatedMascota) : res.status(400).json(updatedMascota);
  }else{
    res.status(404).json({msg:"mascota no existe"})
  }
});


// Eliminar una mascota
router.delete('/:id_mascota' , async (req, res)=>{
  res.json(  await query.deleteT(tables.mascotas, req.params));
})



module.exports = router;