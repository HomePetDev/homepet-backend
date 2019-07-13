const db = require('../db');
const tables= require('./tables');

async function findOwner(rif, columns){
  try {
    const res = await db(tables.gerentes).withSchema(tables.schema).select(columns).where('rif_homepet', rif);
    return res[0]; 
  } catch (error) {
    return (error);
  }
}

async function selectAllEmpleados(rif){
  const {rows} = await db.raw(`
    SELECT cedula, nombre, direccion, telefono, fecha_reg, sueldo, fec_ini
    FROM hmpet.usuarios AS u, hmpet.empleados AS e, hmpet.e_trabaja_h AS eh
    WHERE (u.cedula_id = e.cedula AND eh.cedula_empleado = e.cedula AND eh.rif_homepet='${rif}')
  `);
  if (!Array.isArray(rows) || rows.length <= 0){
    return {error:"Resultado no encontrado"}
  }else{
    return rows;
  }
}

async function getHomePetByCedulaOwner(cedula){
  const  {rows} = await db.raw(`
    SELECT rif, capacidad, ciudad, sector, telefono, fecha_creacion, especializacion
    FROM hmpet.gerentes AS g, hmpet.homepets AS h
    WHERE(g.cedula='${cedula}' AND g.rif_homepet = h.rif)
  `);
    if (!Array.isArray(rows) || rows.length <= 0){
      return {error:"Resultado no encontrado"}
    }else{
      return rows[0];
    }
}


module.exports= {
  findOwner, selectAllEmpleados, getHomePetByCedulaOwner
}