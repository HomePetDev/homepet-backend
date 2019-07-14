const db = require("../db");

async function getSpaceLeft (id){

  let spaceUsed
  let result = await db.raw(`
    SELECT SUM(pxa.cantidad) AS suma
    FROM  hmpet.producto_x_almacen AS pxa
    WHERE (pxa.id_almacen = '${id}' );
  `);

  if(!result.rows[0].suma){
    spaceUsed = 0;
  }else{
    spaceUsed = result.rows[0].suma
  }

  const {rows} = await db.raw(`
    SELECT capacidad - ${spaceUsed} AS total
    FROM hmpet.almacen 
    WHERE (id= '${id}');
  `);

  if (!Array.isArray(rows) || rows.length <= 0){
    return {error:"Resultado no encontrado"}
  }else{    
    return rows[0];
  }  
}

async function deleteProductsFromAlmacen (id_almacen){
  const result = await db.raw (`
    DELETE FROM hmpet.productos AS p
    USING hmpet.producto_x_almacen AS pxa, hmpet.almacen AS a
    WHERE a.id = '${id_almacen}' AND pxa.id_almacen = a.id AND pxa.id_prod = p.id_producto
  `)

  return result 
}


module.exports = {
  getSpaceLeft, deleteProductsFromAlmacen
}