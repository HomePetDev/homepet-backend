const db = require('../db');
const { gerentes } = require('./tables');


async function selectAll(){
  const { rows } = await db.raw(`
    SELECT cedula_id, nombre, direccion, telefono, fecha_reg, id_acceso, sueldo, rif_homepet,fecha_ini
    FROM hmpet.usuarios AS u, hmpet.gerentes AS g 
    WHERE (u.cedula_id = g.cedula)`
    
  );

  if (!Array.isArray(rows) || rows.length <= 0){
    return {error:"Resultado no encontrado"}
  }else{
    return rows;
  }
}

async function findByCI (cedula){
  const { rows } = await db.raw(`
    SELECT cedula_id, nombre, direccion, telefono, fecha_reg, id_acceso, sueldo, rif_homepet,fecha_ini
    FROM hmpet.usuarios AS u, hmpet.gerentes AS g
    WHERE (  u.cedula_id = '${cedula}' AND g.cedula = u.cedula_id)
  `);

  if (!Array.isArray(rows) || rows.length <= 0){
    return {error:"Resultado no encontrado"}
  }else{
    return rows[0];
  }
}

module.exports = {
  selectAll, findByCI
}

