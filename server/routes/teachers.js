const {Router} = require('express')

const teacherController = require('../controllers/teachers')

const teacherRouter = Router();

teacherRouter.post('/login', teacherController.login);
teacherRouter.post('/register', teacherController.register);

module.exports = teacherRouter;