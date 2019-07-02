const router = require('express').Router();
const query = require('../../queries');
const tables = require('../../queries/tables');

const returning = "*"

router.post('/:rif' , async (req,res)=>{

  const empleado = await query.insert(tables.empleados, req.body.payload , "*");
  if (!empleado.name){
    const result = await query.insert(tables.e_trabaja_h, {
       cedula_empleado:empleado.cedula, 
       rif_homepet: req.params.rif
    }, "*")

    if (!result.name){

      const update =  await query.update(tables.usuarios, {cedula_id: empleado.cedula}, {id_acceso:3}, "*");
      if (!update.name){
        res.json({empleado, result});
      }
    }else{
      await query.deleteT(tables.empleados, {cedula:empleado.cedula});
      res.json(400).json(empleado);
    }
  }else{
    res.status(400).json(empleado);
  }
  
})

// Obtiene todos los empleados
router.get('/', async (req, res)=> {
  const empleados = await query.select(tables.empleados, returning);
  empleados ? res.json(empleados) : res.status(500).json(empleados)
})

router.get('/:cedula', async (req, res)=>{
  const empleado = await query.select(tables.empleados, returning , req.params);
  empleado ? res.json(empleado) : res.status(400).json(empleado);
})

router.patch('/:cedula' , async(req,res)=>{
  const empleado = await query.select(tables.empleados, "*" , req.params);
  if ( empleado ){
    const updatedEmpleado = await query.update(tables.empleados, req.params,req.body.payload, returning);
    !updatedEmpleado.name ? res.json(updatedEmpleado) : res.status(400).json(updatedEmpleado);
  }else{
    res.status(404).json({msg:"empleado no existe"})
  }
});

router.delete('/:cedula' , async(req,res)=>{
  res.json(await query.deleteT(tables.empleados, req.params));

});

module.exports = router;