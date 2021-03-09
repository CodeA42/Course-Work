const { Router } = require('express');
const router = Router();

const middlewares = require('./config/middlewares');

const aboutController = require('./controllers/aboutController');
const articleController = require('./controllers/articleController');
const mainController = require('./controllers/mainController');
const userController = require('./controllers/userController');

router.use(middlewares.urlencodedParser);

router.use('/about', aboutController);
router.use('/article', articleController);
router.use('/user', userController);
router.use('/', mainController);
router.use('*', (req, res) => {
  res.status(404).render('404', {title: 'Not Found', user: req.user});
});


module.exports = router;