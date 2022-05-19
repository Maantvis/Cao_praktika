const express = require('express');
const { validateToken } = require('../middleware');
const { getArticles, addArticle, getArticle } = require('../model/articlesModel');

const articleRoutes = express.Router();

articleRoutes.get('/articles', validateToken, async (req, res) => {
  let conn;
  try {
    const articles = await getArticles();
    res.json({ articles, user_id: req.userId });
  } catch (error) {
    res.status(500);
  } finally {
    conn?.end();
  }
});
articleRoutes.get('/article/:id', validateToken, async (req, res) => {
  const id = req.params;
  let conn;
  try {
    const article = await getArticle(id);
    res.json({ article, user_id: req.userId });
  } catch (error) {
    res.status(500);
  } finally {
    conn?.end();
  }
});
articleRoutes.get('/articles/:id', validateToken, async (req, res) => {
  const id = req.params;
  let conn;
  try {
    const articles = await getArticles(id);
    res.json({ articles, user_id: req.userId });
  } catch (error) {
    res.status(500);
  } finally {
    conn?.end();
  }
});
articleRoutes.post('/articles', validateToken, async (req, res) => {
  let conn;

  const { date, title, content, user_id } = req.body;
  try {
    const articles = await addArticle(date, title, content, user_id);

    if (articles.affectedRows === 1) {
      res.status(201).json({ success: true, msg: 'articles created' });
      return;
    }
    res.status(400).json('no articles created');
  } catch (error) {
    res.status(500);
  } finally {
    conn?.end();
  }
});

module.exports = articleRoutes;
