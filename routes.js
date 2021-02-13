const { Router } = require('express');
const router = Router();

const aboutController = require('./controllers/aboutController');
const articleController = require('./controllers/articleController');
const mainController = require('./controllers/mainController');
const userController = require('./controllers/userController');


router.use('/about', aboutController);
router.use(articleController);
router.use(mainController);
router.use(userController);


module.exports = router;