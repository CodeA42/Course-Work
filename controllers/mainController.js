const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.render('home', {title: 'Home Page'});
});

router.get('/register', (req, res) => {
  res.render('users/register', {title: 'Register'});
});

router.get('/login', (req, res) => {
  res.render('users/login', {title: 'Login'});
});




module.exports = router;