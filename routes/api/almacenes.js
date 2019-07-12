const router = require ('express').Router();
const query = require ('../../queries');
const { deleteProductsFromAlmacen } = require ('../../queries/almacenes');
const tables  = require ('../../queries/tables');
const uuid = require('uuid/v4');


// crea un nuevo almacen en un homepet
router.post('/:rifhmpet', async (req,res)=>{
  const id = uuid().slice(0,8);
  const almacen = await query.insert(tables.almacenes,{
    id, ...req.params, ...req.body.payload, id 
  }, "*");
  almacen.error ? res.status(400).json(almacen) : res.json(almacen);
});

router.get('/:rifhmpet', async (req,res)=>{
  const almacenes = await query.select(tables.almacenes, "*" , req.params);
  almacenes.error ? res.status(404).json(almacenes) : res.json(almacenes);
})

// Actualiza la informacion de un almacen
router.patch('/:id' , async(req,res)=>{
  const almacen = await query.select(tables.almacens, "*" , req.params);
  if ( !almacen.error ){
    const updatedalmacen = await query.update(tables.almacenes, req.params,req.body.payload, "*");
    !updatedalmacen.error ? res.json(updatedalmacen) : res.status(400).json(updatedalmacen);
  }else{
    res.status(404).json({msg:"almacen no existe"})
  }
});

// Borra un almacen
router.delete('/:id' , async(req,res)=>{
  await deleteProductsFromAlmacen(req.params.id)
  res.json(await query.deleteT(tables.almacenes, req.params ));
});


module.exports = router;