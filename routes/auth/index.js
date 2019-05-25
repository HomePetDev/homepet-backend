const router = require('express').Router();

const {findByUsername, findByEmail , insert , findByUsernameOrEmail} = require('../../queries/usuario');
const { createJWT, createHash, verifyHash} = require('./utils');

router.post('/login' , async (req, res) => {
    const {username , email, password } = req.body;
    try {
      let usuario = await findByUsernameOrEmail(email, username);
      if(usuario){ 
        const match = await verifyHash (password , usuario.password);
        if (!match){
          res.status(404).json({msg: 'Contraseña invalida'});
        }else{          
          const token = await createJWT({id:usuario.id});
          res.status(200).json({token});
        }
      }else{
        res.status(404).json({msg:'Usuario no existe o no fue encontrado'})
      }
    } catch (error) {      
      res.status(400).json(error);
    }
  }
);

router.post('/signin', async (req, res) => {
  const {username , email, password } = req.body;
  const nuevoUsuario = {
    username, email, password: await createHash(password), role_id:1
  }
  try {
    usuario = await insert(nuevoUsuario);
    res.status(201).json(usuario);
  } catch (error) {    
    res.status(400).json({msg: error.detail});
  }
});

module.exports = router;