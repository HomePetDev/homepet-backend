const db = require('../db');
const tableName = 'empleados'

// Busca un empleado por su cedula de indentidad
function findByCI(CI){
  return db(tableName).where('CI', CI).first();
}

// Actualiza la informacion de un empleado
async function update(CI, empleado){
  const rows = await db(tableName).where('CI' , CI).update(empleado, '*');
  delete rows[0].password;
  return rows[0];
}

// Inserta un nuevo empleado en la base de datos
async function insert(empleado){
  const rows = await db(tableName).insert(empleado, '*');
  delete rows[0].password;
  return rows[0]; 
}

async function getAll(){
  return await db.select('*').from(tableName)
}

module.exports = {
  findByCI , update, insert, getAll
}