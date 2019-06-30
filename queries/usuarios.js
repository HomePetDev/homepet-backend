const db = require ('../db');
const { USUARIOS } = require('./tables');


async function selectAll(){
  const res = await db.query(`SELECT cedula_id, nombre, direccion, telefono, fecha_reg FROM ${USUARIOS}`);  
  return res.rows;
}

async function findByCI(cedula){
  const res = await db.query(`
    SELECT cedula_id, nombre, direccion, telefono, fecha_reg FROM ${USUARIOS} WHERE cedula_id LIKE '%${cedula}%'
    
  `);  
  if (res.rows.length <= 0){
    return null
  }
  else {
    return res.rows[0];
  }
}

async function insert({cedula_id, pass, nombre, direccion, telefono}){

  const text = `
    INSERT INTO ${USUARIOS} (cedula_id, pass, nombre, direccion, telefono, id_acceso )
    VALUES ($1, $2, $3, $4, $5, '1' ) RETURNING cedula_id, nombre`;
  const values = [cedula_id, pass, nombre, direccion, telefono];
  const res = await db.query(text, values);  
  return res.rows;
}

async function update(id, nombre, edad){
  const res = await db.query(
    `UPDATE ${USUARIOS} SET nombre = $1, edad = $2
     WHERE (id=${id}) RETURNING *`
  ,[nombre,edad]);
  return res.rows;
}

async function deleteByCI(cedula){
  const res = await db.query(`DELETE FROM ${USUARIOS} WHERE cedula_id LIKE '%${cedula}%`);
  return res;
}


module.exports = {
  selectAll,insert, findByCI, update, deleteByCI
}