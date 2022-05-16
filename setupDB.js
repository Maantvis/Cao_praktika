const mysql = require('mysql2/promise');
const { dbConfig } = require('./src/config');
require('dotenv').config();

async function connect(sql) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const [data] = await conn.execute(sql);
    return data;
  } catch (error) {
    console.log('error ===', error);
    return error;
  } finally {
    await conn?.end();
  }
}
async function runcomand() {
  const info = await connect(`SHOW TABLES`);
  console.log('info ===', info);
}
runcomand();
