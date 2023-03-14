const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo');
const isAuth = require('../middleware/requireAuth')

router.get('/', isAuth,todoController.getList);
router.get('/new', isAuth,todoController.getAddTask);
router.post('/new', isAuth,todoController.postAddTask);
router.post('/delete-task', isAuth,todoController.postDeleteTask);

module.exports = router;
