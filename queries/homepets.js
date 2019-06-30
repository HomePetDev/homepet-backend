const db = require('../db');
const tables = require('./tables')

async function selectAll(){
  const res = await db.query(`SELECT * FROM ${tables.HOMEPETS}`);  
  return res.rows;
}

async function findByRIF(rif){
  const res = await db.query(`SELECT * FROM ${USUARIOS} WHERE rif LIKE '%${rif}%'`);  
  if (res.rows.length <= 0){
    return null
  }
  else {
    return res.rows[0];
  }
}

async function insert({rif, capacidad , ciudad , sector, especializacion}){

  const text = `
    INSERT INTO ${USUARIOS} (rif, capacidad , ciudad , sector, especializacion)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const values = [rif, capacidad , ciudad , sector, especializacion];  
  const res = await db.query(text, values);
  console.log(res);
  
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
  selectAll,insert, findByRIF, update, deleteByCI
}
