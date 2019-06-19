const router = require('express').Router();

const { insert, update,  findByCI , getAll} = require('../../../queries/empleados');
const { createJWT, createHash, verifyHash} = require('./utils');

router.post('/login' , async (req, res) => {
    const {CI , password } = req.body;
    try {
      let empleado = await findByCI(CI);
      if(empleado){ 
        const match = await verifyHash (password , empleado.password);
        if (!match){
          res.status(404).json({msg: 'Contraseña invalida'});
        }else{          
          const token = await createJWT({id:empleado.id});
          res.status(200).json({token});
        }
      }else{
        res.status(404).json({msg:'empleado no existe o no fue encontrado'})
      }
    } catch (error) {      
      res.status(400).json(error);
    }
  }
);

router.post('/signin', async (req, res) => {
  const {CI , nombre , direccion , telefono, sueldo, ocupacion, password } = req.body;
  const nuevoEmpleado = {
    CI, nombre,  direccion , telefono, sueldo, ocupacion, password: await createHash(password),
  }
  
  try {
    empleado = await insert(nuevoEmpleado);
    res.status(201).json(empleado);
  } catch (error) {    
    res.status(400).json({msg: error.detail});
  }
});

module.exports = router;