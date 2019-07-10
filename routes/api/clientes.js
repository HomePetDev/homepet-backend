const router = require ('express').Router();
const query = require ('../../queries');
const {clientes } = require ('../../queries/tables');

router.post('/', async (req,res)=>{
    const cliente = await query.insert(clientes, req.body.payload, "*");
    cliente.error ? res.status(400).json(cliente) : res.json(cliente);
});

// Obtiene todos los empleados
router.get('/', async (req, res)=> {
  const empleados = await query.select(tables.empleados, returning);
  empleados ? res.json(empleados) : res.status(500).json(empleados)
})


// Obtiene un empleado con una sedula dada
router.get('/:cedula', async (req, res)=>{
  const empleado = await query.select(tables.empleados, returning , req.params);
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