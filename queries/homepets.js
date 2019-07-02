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


module.exports= {
  findOwner,
}