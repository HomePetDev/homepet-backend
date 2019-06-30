const router = require('express').Router();

const { insert, findByCI } = require('../../../queries/usuarios');
const { createJWT, createHash, verifyHash} = require('./utils');

router.post('/login' , async (req, res) => {
    const {cedula_id , pass } = req.body;
    try {
      let usuario = await findByCI(cedula_id);  
      console.log(usuario);
      
      if(usuario){ 
        const match = await verifyHash (pass , usuario.pass);
        if (!match){
          res.status(404).json({msg: 'Contraseña invalida'});
        }else{          
          const token = await createJWT({cedula_id:usuario.cedula_id});          
          res.status(200).json({token});
        }
      }else{
        res.status(404).json({msg:'usuario no existe o no fue encontrado'})
      }
    } catch (error) {      
      console.log(error);
      res.status(400).json(error);
    }
  }
);

router.post('/signin', async (req, res) => {
  const {cedula_id, pass, nombre, direccion, telefono} = req.body;
  const nuevoUsuario = {
    cedula_id, nombre,  direccion , telefono, pass: await createHash(pass), id_acceso:'1'
  }
  
  try {
    usuario = await insert(nuevoUsuario);
    res.status(201).json(usuario);
  } catch (error) {    
    console.log(error);
    res.status(400).json({msg: error.detail});
  }
});

module.exports = router;