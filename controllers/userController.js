const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.render('users/profile', {title: 'Profile'});
});

module.exports = router;