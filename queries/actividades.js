const db = require ('../db');

async function getIdSerial(rif, nombre){
  const { rows }= await db.raw(`
    SELECT COUNT( nombre_serv ) AS total
    FROM hmpet.actividades
    WHERE ( rif = '${rif}' AND nombre_serv = '${nombre}');

  `);


  if (!Array.isArray(rows) || rows.length <= 0){
    return {error:"Resultado no encontrado"}
  }else{
    return Number(rows[0].total);
  }
}




module.exports = {
    getIdSerial

}