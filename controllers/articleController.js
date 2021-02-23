const { Router } = require('express');
const router = Router();
const mongoose = require('mongoose');

router.get('/create', (req, res) => {
  res.render('article/create', {title: 'Create Article'});
});

router.post('/post', async (req, res) => {
  const ArticleModel = mongoose.model('ArticleModel');
  const article = new ArticleModel();

  const authorsList = req.body.authors.split(',').map(e => {return {'fullName': e}});

  article.title = req.body.title;
  article.body = req.body.content;
  article.authors = authorsList;

  const saved = await article.save();
  console.log(saved);

  res.redirect(`article/${saved._id}`, {title: saved.title});
});

router.get('/:id', (req, res) => {
  res.render('article/view', {title: `Article ${req.params.id}`});
});

module.exports = router;