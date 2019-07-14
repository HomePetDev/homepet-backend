const db = require('../db');


async function selectAll(){
  const { rows } = await db.raw(`
    SELECT cedula_id, nombre, direccion, telefono, fecha_reg, id_acceso, email
    FROM hmpet.usuarios AS u, hmpet.clientes AS c 
    WHERE (u.cedula_id = c.cedula)` 
  );

  if (!Array.isArray(rows) || rows.length <= 0){
    return {error:"Resultado no encontrado"}
  }else{
    return rows;
  }
}

async function findByCI (cedula){
  const { rows } = await db.raw(`
    SELECT cedula_id, nombre, direccion, telefono, fecha_reg, id_acceso, email
    FROM hmpet.usuarios AS u, hmpet.clientes AS c
    WHERE (  u.cedula_id = '${cedula}' AND c.cedula = u.cedula_id)
  `);

  if (!Array.isArray(rows) || rows.length <= 0){
    return {error:"Resultado no encontrado"}
  }else{
    return rows[0];
  }
}

module.exports = {
  selectAll , findByCI
}