const { Router } = require('express');
const router = Router();
const mongoose = require('mongoose');
const dbQueries = require('../db/queries');

router.get('/create', (req, res) => {
  res.render('article/create', {title: 'Create Article', user: req.user});
});

router.post('/create', async (req, res) => {
  const ArticleModel = mongoose.model('ArticleModel');
  const UserModel = mongoose.model('User');

  const article = new ArticleModel();

  const inputList = req.body.authors
  .split(',')
  .map(e => e.trim())
  .filter(function t(e, index, arr) {
    for (let i = 0; i < index; i++) {
      if(e == arr[i]) {
        return false;
      }
    }
    return true;
  });

  const authorsList = await getUserList(inputList);
  const userList = authorsList.filter(e => e != null).map(e =>{return  {"id": e}});

  async function getUserList(authorsList) {
    return Promise.all(authorsList.map(async function (username) {
      const id = await dbQueries.getUserIdByUsername(username);
      return (id) ? id.toString() : null;
    }))
  }

  article.title = req.body.title;
  article.body = req.body.content;
  article.authors = userList;
  article.postDate = new Date();
  article.postedBy = req.user._id;

  const saved = await article.save();

  function updateUsers() {
    const savedObj = saved.toObject();
    
    savedObj.authors.forEach(async function(e) {
      console.log(e)
      console.log(e.id)
      const user = await UserModel.findById(e.id).exec();
      console.log(user);
      user.articles.push(savedObj._id);
      user.save();
    })
  }
  updateUsers();
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