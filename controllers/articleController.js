const { Router } = require('express');
const router = Router();
const mongoose = require('mongoose');

router.get('/create', (req, res) => {
  res.render('article/create', {title: 'Create Article', user: req.user});
});

router.post('/create', async (req, res) => {
  const ArticleModel = mongoose.model('ArticleModel');
  const article = new ArticleModel();

  const authorsList = req.body.authors.split(',').map(e => {return {'fullName': e.trim()}});

  article.title = req.body.title;
  article.body = req.body.content;
  article.authors = authorsList;
  article.postDate = new Date();

  const saved = await article.save();

  res.redirect(`/article/${saved._id}`);
});

router.get('/:id', async (req, res) => {
  const ArticleModel = mongoose.model('ArticleModel');

  try {
    const article = await ArticleModel.findById(req.params.id).exec();
    const articleObj = article.toObject();
    res.render('article/view', {article: articleObj, user: req.user});
  } catch(e) {
    res.status(404).render('article/404', {title: 'Article not found', id: req.params.id, user: req.user});
  }
});

module.exports = router;