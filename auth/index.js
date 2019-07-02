const router = require('express').Router();

const { createJWT, createHash, verifyHash} = require('./utils');
const query = require('../queries');
const tables = require('../queries/tables');

router.post('/login' , async (req, res) => {
    const {CI , pass } = req.body;
    try {
      let usuario = await usuariosQuery.findByCI(CI);
      if(usuario){ 
        const match = await verifyHash (pass , usuario.pass);
        if (!match){
          res.status(404).json({msg: 'Contraseña invalida'});
        }else{          
          const token = await createJWT({id:usuario.id});
          res.status(200).json({token});
        }
      }else{
        res.status(404).json({msg:'usuario no existe o no fue encontrado'})
      }
    } catch (error) {  
      res.status(400).json(error);
    }
  }
);

router.post('/signin', async (req, res) => {
  const {cedula_id , nombre , direccion , telefono, pass } = req.body.payload;
  const nuevoUsuario = {
    cedula_id, nombre,  direccion , telefono, pass: await createHash(pass),
  }

  usuario = await query.insert(tables.usuarios, nuevoUsuario, ['cedula_id', 'nombre']);
  if (!usuario.error){
    res.status(201).json(usuario);    
  }else{
    console.log(usuario);
    res.status(400).json(usuario);
  }
});

module.exports = router;