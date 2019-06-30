const router = require('express').Router();

const { } = require ('../../queries/homepets');

// @route GET api/usuarios
// @desc obtiene todos los usuarios existentes
// @access  publico
router.get('/', async (req, res) => {
  try {
    const usuarios = await selectAll();    
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.json(error)
  }  
})

// @route get api/usuarios/cedula
// @desc obtiene un usuario dada cedula_id
// @access  private
router.get('/:cedula_id',  async (req, res) => {

  try {
    const data = await findByCI(req.params.cedula_id); 
    if (data){
      res.json(data)  
    }else{
      res.status(404).json({msg: "Usuario no encontrado"})
    }
  } catch (error) {
    console.log(error);
    res.json(error);  
  }
})






module.exports = router;