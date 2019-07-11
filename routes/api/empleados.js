const router = require('express').Router();
const query = require('../../queries');
const { selectAll, findByCI } = require('../../queries/empleados');
const tables = require('../../queries/tables');

const returning = "*"

router.post('/:rif' , async (req,res)=>{
  const { cedula, sueldo } = req.body.payload;
  const usuario = await query.select(tables.usuarios, "*", {cedula_id:cedula});
  if (!usuario.error && usuario.id_acceso === 1 ){
    const newEmpleado = await query.insert(tables.empleados, {cedula, sueldo}, "*");
    if (newEmpleado.error){
      res.status(400).json(newEmpleado);
    }else{
      const result = await query.insert(tables.e_trabaja_h,{
        cedula_empleado: cedula,
        rif_homepet: req.params.rif
      },"*");
      if (result.error){
        await query.deleteT(tables.empleados, {cedula});
        res.status(400).json({error:"No se pudo añadir el empleado"});
      }else{
        await query.update(tables.usuarios, {cedula_id: cedula} , {id_acceso: 3}, "*");
        res.json({newEmpleado, result});
      }
    }
  }else{
    res.status(400).json({error:"Empleado no esta registrado como usuario o tiene otro rol asignado"})
  }
    
})

// Obtiene todos los empleados
router.get('/', async (req, res)=> {
  const empleados = await selectAll();
  empleados.error ? res.status(404).json(empleados) : res.json(empleados)
})

// Obtiene un empleado con una cedula dada
router.get('/:cedula', async (req, res)=>{
  const empleado = await findByCI(req.params.cedula);  
  empleado ? res.json(empleado) : res.status(400).json(empleado);
})


// Actualiza la informacion de un empleado
router.patch('/:cedula' , async(req,res)=>{
  const empleado = await query.select(tables.empleados, "*" , req.params);
  if ( empleado ){
    const updatedEmpleado = await query.update(tables.empleados, req.params,req.body.payload, returning);
    !updatedEmpleado.name ? res.json(updatedEmpleado) : res.status(400).json(updatedEmpleado);
  }else{
    res.status(404).json({msg:"empleado no existe"})
  }
});

// Borra un empleado
router.delete('/:cedula' , async(req,res)=>{

  const cedula =  req.params.cedula
    
  if (await query.deleteT(tables.empleados,req.params)){
    const userUpdated = query.update(tables.usuarios,{cedula_id:cedula}, {id_acceso:1}, "*");
    if (userUpdated.error){
      res.json(userUpdated);
    }else{
      res.json(1);
    }
  }
});






module.exports = router;