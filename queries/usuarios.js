const db = require('../db');
const tables= require('./tables');

module.exports= {
  async insert(payload){
    try {
      const rows = await db(tables.usuarios).insert(payload, "*");
      return rows[0];
    } catch (error) {
      return error;
    }
  },
  async update(cedula_id, payload){
    try {
      const rows = await db(tables.usuarios).where('cedula_id', cedula_id).update(payload,"*");
      return rows[0];
    } catch (error) {
      return error
    }
  },
    findByCI(cedula_id){
    try {
      return db(tables.usuarios).where('cedula_id', cedula_id).first();      
    } catch (error) {
      return error
    }
  },
  getAll(){
    try {
        return db(tables.usuarios).select("*");
    } catch (error) {
      return error
    }
  }
}