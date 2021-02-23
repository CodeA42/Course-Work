const { Router } = require('express');
const router = Router();

router.get('/create', (req, res) => {
  res.render('article/create', {title: 'Create Article'});
});

router.post('/post', (req, res) => {
  
  res.render('article/create', {title: 'Create Article'});
});

router.get('/:id', (req, res) => {
  res.render('article/view', {title: `Article ${req.params.id}`});
});

module.exports = router;