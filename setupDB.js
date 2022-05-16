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

// CREATE TABLE defaultdb ( id INT AUTO_INCREMENT , email VARCHAR(255) , password VARCHAR(255) , reg_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (id), UNIQUE (email)) ENGINE = InnoDB

// CREATE TABLE articles (id INT AUTO_INCREMENT , date DATE , title TEXT , content TEXT, PRIMARY KEY (id)) ENGINE = InnoDB
