const { Router } = require('express');
const router = Router();
const mongoose = require('mongoose');

router.get('/create', (req, res) => {
  res.render('article/create', {title: 'Create Article'});
});

router.post('/create', async (req, res) => {
  const ArticleModel = mongoose.model('ArticleModel');
  const article = new ArticleModel();

  const authorsList = req.body.authors.split(',').map(e => {return {'fullName': e}});

  article.title = req.body.title;
  article.body = req.body.content;
  article.authors = authorsList;

  const saved = await article.save();

  res.redirect(`/article/${saved._id}`);
});

router.get('/:id', async (req, res) => {
  const ArticleModel = mongoose.model('ArticleModel');

  const article = await ArticleModel.findById(req.params.id).exec();
  let articleObj = article.toObject();

  res.render('article/view', articleObj);
});

module.exports = router;