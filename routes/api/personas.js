const  router = require('express').Router();

const { selectAll, insert, findById , update , deleteById} = require('../../queries/personas');

// @route GET api/pruebas
// @desc obtiene todos las tuplas en una tabla "personas"
// @access  private
router.get('/', async (req,res) => {
  try {
    const personas = await selectAll();    
    res.status(200).json(personas);
  } catch (error) {
    console.error(error);
    res.json(error)
  }  
});

// @route POST api/pruebas/1
// @desc obtiene una persona dada por el id
// @access  private
router.get('/:id',  async (req, res) => {

  try {
    const persona = await findById(req.params.id);  
    res.json(persona)  
  } catch (error) {
    console.log(error);
    res.json(error);  
  }
})


// @route POST api/pruebas
// @desc crea una nueva persona
// @access  private
router.post('/',  async (req, res) => {

  const {nombre, edad} = req.body // obteniendo datos de req.body

  try {
    const nuevaPersona = await insert(nombre,edad);    
    res.status(201).json(nuevaPersona);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
})


// @route PATCH api/pruebas/1
// @desc crea una nueva persona
// @access  private
router.patch('/:id', async (req,res) => {
    try {
      const personaActualizada =  await update(req.params.id, req.body.nombre, req.body.edad);
      res.status(202).json(personaActualizada);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
});


// @route DELETE api/pruebas/1
// @desc crea una nueva persona
// @access  private
router.delete('/:id', async (req, res) => {
  try {
    const res = await deleteById(req.params.id);
    res.json({msg:"Se borro el usuario"});
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = router;