const router = require('express').Router();
const query = require('../../queries');
const tables = require('../../queries/tables');

const returning = "*"

// Crea un servicio en un homepet
router.post('/:rif' , async (req,res)=>{
  const { nombre, desc_servicio } = req.body.payload
  const rif = req.params.rif;
  const newServicio = await query.insert(tables.servicios, {rif , nombre, desc_servicio}, "*");
  newServicio.error ? res.status(400).json(newServicio) : res.json(newServicio);
})

// Obtiene todos los servicios de un homepet
router.get('/:rif', async (req, res)=> {
  const servicios = await query.select(tables.servicios, "*" , {rif:req.params.rif});
  servicios.error ? res.status(404).json(servicios) : res.json(servicios); 
})

// Actualiza la informacion de un servicio en un homepet
router.patch('/:rif/:nombre' , async(req,res)=>{

  const servicio = await query.select(tables.servicios, "*" , req.params);  
  if ( servicio ){
    const updatedServicio = await query.update(tables.servicios, req.params,req.body.payload, returning);
    !updatedServicio.error ? res.json(updatedServicio) : res.status(400).json(updatedServicio);
  }else{
    res.status(404).json({msg:"servicio no existe"})
  }
});

// Borra un servicio
router.delete('/:rif/:nombre' , async(req,res)=>{

 
});






module.exports = router;