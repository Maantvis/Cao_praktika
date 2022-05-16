const express = require('express');
const { validateToken } = require('../middleware');
const { getArticles, addArticle } = require('../model/articlesModel');

const articleRoutes = express.Router();

articleRoutes.get('/articles', async (req, res) => {
  let conn;
  try {
    const articles = await getArticles();
    res.json(articles);
  } catch (error) {
    console.log('error in getting articles', error);
    res.status(500);
  } finally {
    conn?.end();
  }
});
articleRoutes.post('/articles', async (req, res) => {
  let conn;
  console.log(req.body);
  const { date, title, content } = req.body;
  try {
    const articles = await getArticles(date, title, content);
    res.status(201).json({ success: true });
  } catch (error) {
    console.log('error in getting articles', error);
    res.status(500);
  } finally {
    conn?.end();
  }
});

module.exports = articleRoutes;
