const db = require('../db');

function findById(id){
  return db('usuario').where('id', id).first();
}

function findByEmail(email){
  return db('usuario').where('email', email).first();
 }

function findByUsername(username){
  return db('usuario').where('username', username).first();
}

async function findByUsernameOrEmail(email, username){
   if (email){
     return await findByEmail(email);
   }else if(username){
     return await findByUsername(username)
   }else{
     return null;
   }
}

async function update(id, usuario){
  const rows = await db('usuario').where('id' , id).update(usuario, '*');
  delete rows[0].password;
  return rows[0];
}

async function insert(usuario){
  const rows = await db('usuario').insert(usuario, '*');
  delete rows[0].password;
  return rows[0]; 
}

module.exports = {
  findByEmail, findById ,findByUsername, update, insert, findByUsernameOrEmail
}