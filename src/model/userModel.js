const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function addUserToDb(email, password) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    const [result] = await conn.execute(sql, [email, password]);
    return result;
  } catch (error) {
    console.log('error addUsersToDb', error);
    return false;
  } finally {
    conn?.end();
  }
}

async function getUsers() {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM users';
    const [result] = await conn.execute(sql);
    return result;
  } catch (error) {
    console.log('getUsers error ===', error);
    return false;
  } finally {
    await conn?.end();
  }
}

async function findUserByEmail(email) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);

    const sql = `
      SELECT * FROM users 
      WHERE email=?
         `;
    const [result] = await conn.execute(sql, [email]);
    return result;
  } catch (error) {
    console.log('findUserByEmail error ===', error);
    return false;
  } finally {
    await conn?.end();
  }
}
module.exports = { addUserToDb, findUserByEmail, getUsers };
