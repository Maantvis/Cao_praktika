const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function getArticles() {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM articles';
    const [result] = await conn.execute(sql);
    return result;
  } catch (error) {
    console.log('getArticles error ===', error);
    return false;
  } finally {
    await conn?.end();
  }
}

async function addArticle(date, title, content) {
  let conn;
  console.log(date, title, content);
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO articles (date, title, content) VALUES (?, ?, ?)';
    const [result] = await conn.execute(sql, [date, title, content]);
    return result;
  } catch (error) {
    console.log('error addArticle', error);
    return false;
  } finally {
    conn?.end();
  }
}

module.exports = { getArticles, addArticle };
