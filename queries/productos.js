const db = require('../db');

async function getAllProducts (){
  const {rows}= await db.raw(`
    SELECT id_producto,  nombre_prod, descripcion, precio, instrucciones, nombre_especie, contenido, id_almacen, cantidad 
    FROM hmpet.productos AS p, hmpet.producto_x_almacen AS pxa
    WHERE ( p.id_producto = pxa.id_prod )
  `);

  if (!Array.isArray(rows) || rows.length <= 0){
    return {error:"Resultado no encontrado"}
  }else{
    return rows;
  }
}

async function getAllByHomepet(rif){
  const {rows} = await db.raw(`
    SELECT id_producto,  nombre_prod, p.descripcion, precio, instrucciones, nombre_especie, contenido, cantidad , pxa.id_almacen
    FROM hmpet.productos AS p, hmpet.producto_x_almacen AS pxa, hmpet.almacen AS a 
    WHERE ( a.rifhmpet ='${rif}' AND pxa.id_almacen = a.id AND pxa.id_prod = p.id_producto )
  `);
  if (!Array.isArray(rows) || rows.length <= 0){
    return {error:"Resultado no encontrado"}
  }else{
    return rows;
  }
}

async function getAllByAlmacen(almacen){
  const {rows} = await db.raw(`
      SELECT id_producto,  nombre_prod, p.descripcion, precio, instrucciones, nombre_especie, contenido, cantidad 
      FROM hmpet.productos AS p, hmpet.producto_x_almacen AS pxa
      WHERE ( pxa.id_almacen = '${almacen}' AND pxa.id_prod = p.id_producto )
  `);

  if (!Array.isArray(rows) || rows.length <= 0){
    return {error:"Resultado no encontrado"}
  }else{
    return rows;
  }
}



module.exports ={
  getAllProducts, getAllByHomepet , getAllByAlmacen
}

