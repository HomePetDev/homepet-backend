const db = require('../db');


async function selectAll(){
  const { rows } = await db.raw(`
    SELECT cedula_id, nombre, direccion, telefono, fecha_reg, id_acceso, sueldo
    FROM hmpet.usuarios AS u, hmpet.empleados AS e 
    WHERE (u.cedula_id = e.cedula)`
    
  );

  if (!Array.isArray(rows) || rows.length <= 0){
    return {error:"Resultado no encontrado"}
  }else{
    return rows;
  }
}

async function findByCI (cedula){
  const { rows } = await db.raw(`
    SELECT cedula_id, nombre, direccion, telefono, fecha_reg, id_acceso, sueldo, rif_homepet, fec_ini
    FROM hmpet.usuarios AS u, hmpet.empleados AS e, hmpet.e_trabaja_h AS exh
    WHERE (  u.cedula_id = '${cedula}' AND e.cedula = u.cedula_id  AND exh.cedula_empleado = e.cedula)
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