const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function getArticles(id) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);

    const sql =
      id === undefined
        ? 'SELECT * FROM articles'
        : `SELECT * FROM articles WHERE user_id=${id.id} `;
    const [result] = await conn.execute(sql);
    return result;
  } catch (error) {
    return false;
  } finally {
    await conn?.end();
  }
}
async function getArticle(id) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);

    const sql = `SELECT * FROM articles WHERE id=${id.id} `;
    const [result] = await conn.execute(sql);
    return result;
  } catch (error) {
    return false;
  } finally {
    await conn?.end();
  }
}
async function updateArticle(id, date, title, content) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);

    const sql = `UPDATE articles SET date = ? ,title = ? ,content = ? WHERE id=${id.id} `;
    const [result] = await conn.execute(sql, [date, title, content]);
    return result;
  } catch (error) {
    return false;
  } finally {
    await conn?.end();
  }
}

async function addArticle(date, title, content, user_id) {
  let conn;

  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO articles (date, title, content, user_id) VALUES (?,?, ?, ?)';
    const [result] = await conn.execute(sql, [date, title, content, user_id]);

    return result;
  } catch (error) {
    return false;
  } finally {
    conn?.end();
  }
}

module.exports = { getArticles, addArticle, getArticle, updateArticle };
