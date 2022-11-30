const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const isLoggedIn = require('../middleware/loggedin')

router.get('/login', isLoggedIn, userController.getLogin);
router.post('/login', userController.postLogin);
router.get('/signup', isLoggedIn,userController.getSignup);
router.post('/signup', userController.postSignup);
router.post('/logout', userController.postLogout);

module.exports = router;