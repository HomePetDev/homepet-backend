const db = require('../db');
const {schema} = require('../queries/tables');

async function insert(tableName, payload, columns){
  
  try {
    const rows = await db(tableName).withSchema(schema).insert(payload, columns);
    return rows[0];
  } catch (error) {
    console.error(`FROM INSERT ${error}`);
    return {error: error.detail}
  }

  
}
async function update(tableName, keys , payload, columns){
  try {
    const rows = await db(tableName).withSchema(schema).where(keys).update(payload,columns);
    if (!Array.isArray(rows) || rows.length <= 0){
      return {error:"Resultado no encontrado"}
    }else{
      return rows[0];
    }
  } catch (error) {
    console.error(`FROM UPDATE ${error}`);
    return {error: error.detail}
  }
}
async function select(tableName, columns, keys){
  
  let  rows
  try {
    !keys ?  rows = await db(tableName).withSchema(schema).select(columns) :
    rows = await db(tableName).withSchema(schema).select(columns).where(keys); 
    if (!Array.isArray(rows) || rows.length <= 0){
      return {error:"Resultado no encontrado"}
    }else if (rows.length > 1){
      return rows;
    }else{
      return rows[0];
    }   
  } catch (error) {
    console.error(`FROM SELECT ${error}`);
    return {error: error.detail}
  }
    
}
async function deleteT(tableName, keys){
  try {
    return await db(tableName).withSchema(schema).where(keys).del();
  } catch (error) {
    console.log(`FROM DELETE ${error}`);
    return {error: error.detail}
  }
}


module.exports= {
  
  insert, update, select, deleteT

}