const db = require('../db');
const { gerentes } = require('./tables');


async function selectAll(){
  const {rows} = await db.raw(`SELECT * FROM hmpet.usuarios AS u, hmpet.gerentes AS g WHERE (u.cedula_id = g.cedula)`);

  if (!Array.isArray(rows) || rows.length <= 0){
    return {error:"Resultado no encontrado"}
  }else{
    return rows;
  }
}


module.exports = {
  selectAll
}

