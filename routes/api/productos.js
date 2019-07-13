const router = require("express").Router();
const tables = require("../../queries/tables");
const query = require("../../queries");
const { getAllProducts, getAllByHomepet , getAllByAlmacen } = require("../../queries/productos");
const { getSpaceLeft } = require("../../queries/almacenes");
const uuid = require("uuid/v4");

// Agrega un nuevo producto a un almacen de un homepet
router.post('/:id_almacen', async(req, res) => {
  const id_producto = uuid().slice(0,8);
  const { nombre_prod, descripcion, precio, instrucciones , nombre_especie , cantidad } = req.body.payload;
  const newProducto = { id_producto, nombre_especie, nombre_prod , precio, descripcion, instrucciones};

  // validacion de la capacidad del almacen y la cantidad de producto a insertar
  const spaceLeft = await getSpaceLeft(req.params.id_almacen);
  if (spaceLeft.error){
    res.status(404).json(spaceLeft);            
    return
  }

  if ( spaceLeft.total - cantidad < 0){
    res.status(400).json({error:"No se puede guardar el producto con dicha cantidad"})
    return  
  }
  
  // Inserccion del producto
  const producto = await query.insert(tables.productos, newProducto, "*");
  if (producto.error) {
    res.status(400).json(producto) 
  }else{
    const result = await query.insert(tables.producto_x_almacen, {
      id_prod: id_producto,
      id_almacen: req.params.id_almacen,
      cantidad:cantidad
    },"*");
    result.error ? res.status(400).json(result) : res.json({producto, result})
  }
});


// Selecciona todos los productos
router.get('/', async (req, res) => {
  const productos = await getAllProducts();
  res.json(productos);
});

// Selecciona todos los productos de un homepet
router.get('/homepet/:rif', async (req, res)=>{
  const productos = await getAllByHomepet(req.params.rif);
  productos.error ? res.status(404).json(productos) : res.json(productos)
});

// Selecciona todos los productos de un almacen
router.get('/almacen/:id', async (req, res)=>{
  const productos = await getAllByAlmacen(req.params.id);
  productos.error ? res.status(404).json(productos) : res.json(productos)
})




// Actualiza la informacion de un producto
router.patch('/:id_producto' , async(req,res)=>{
  const producto = await query.select(tables.productos, "*" , req.params);
  
  if ( !producto.error ){
    const update = await query.update(tables.productos, req.params,req.body.payload, "*");
    !update.error ? res.json(update) : res.status(400).json(update);
  }else{
    res.status(404).json({msg:"producto no existe"})
  }
});

// Borra un producto
router.delete('/:id_producto', async (req, res)=>{
  res.json(await query.deleteT(tables.productos, req.params ))
})

/* PRODUCTO COMIDAS */

// Agrega un producto tipo comida a un almacen
router.post('/comida/add', async (req, res)=>{
  const comida = await query.insert(tables.comidas, req.body.payload, "*");
  comida.error ?  res.status(400).json(comida) : res.json(comida);
})

// Selecciona todas las comidas disponibles en nuestro almacen para una mascota  con su correspondiente especie y talla
router.get('/comida/:id_mascota', async(req, res)=>{


})



module.exports = router;