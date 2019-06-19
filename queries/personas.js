const db = require ('../db');
const { PERSONAS } = require('./tables');

/*
    Column |  Type   | Collation | Nullable |               Default
  --------+---------+-----------+----------+--------------------------------------
  id     | integer |           | not null | nextval('personas_id_seq'::regclass)
  nombre | text    |           | not null |
  edad   | integer |           | not null |
*/

async function selectAll(){
  const res = await db.query(`SELECT * FROM ${PERSONAS}`);  
  return res.rows;
}

async function findById(id){
  const res = await db.query(`SELECT * FROM ${PERSONAS} WHERE (id=${id})`);
  return res.rows;
}

async function insert(nombre, edad){
  const text = `INSERT INTO ${PERSONAS}(nombre, edad) VALUES ($1, $2) RETURNING *`;
  const values = [nombre, edad]
  const res = await db.query(text, values);
  return res.rows;
}

async function update(id, nombre, edad){
  const res = await db.query(
    `UPDATE ${PERSONAS} SET nombre = $1, edad = $2
     WHERE (id=${id}) RETURNING *`
  ,[nombre,edad]);
  return res.rows;
}

async function deleteById(id){
  const res = await db.query(`DELETE FROM ${PERSONAS} WHERE id=${id}`);
  return res;
}


module.exports = {
  selectAll,insert, findById, update, deleteById
}