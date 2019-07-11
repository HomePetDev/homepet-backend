const router = require('express').Router();
const query = require('../../queries');
const tables = require('../../queries/tables');
const {getIdSerial } = require('../../queries/actividades');

const returning = "*"

// Crea un actividad de un servicio
router.post('/:rif/:nombre_serv' , async (req,res)=>{
  
  // rif, nombre_serv, id_serial , desc_actividad , precio  
  const { rif, nombre_serv } = req.params;
  const { desc_actividad, precio } = req.body.payload;
  const id_serial = await getIdSerial(rif, servicio)
  const newActividad = {
    rif , nombre_serv ,id_serial, desc_actividad, precio 
  }
  const actividad = await query.insert(tables.actividades, newActividad , "*");
  actividad.error ? res.status(400).json(actividad) : res.json(actividad);
})

// Obtiene todas los actividades de un servicio en un homepet
router.get('/:rif/:nombre_serv', async (req, res)=> {
  const actividades = await query.select(tables.actividades, "*" , req.params);
  actividades.error ? res.status(404).json(actividades) : res.json(actividades); 
})


// Actualiza la informacion de un actividad en un homepet
router.patch('/:rif/:nombre_serv/:id_serial' , async(req,res)=>{
  const actividad = await query.select(tables.actividads, "*" , req.params);  
  if ( actividad ){
    const updatedActividad = await query.update(tables.actividades, req.params, req.body.payload, returning);
    !updatedActividad.error ? res.json(updatedActividad) : res.status(400).json(updatedActividad);
  }else{
    res.status(404).json({msg:"actividad no existe"})
  }
});

// Borra un actividad
router.delete('/:rif/:nombre' , async(req,res)=>{

 
});






module.exports = router;