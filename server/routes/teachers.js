const {Router} = require('express')

const teacherController = require('../controllers/teachers')

const teacherRouter = Router();

teacherRouter.post('/login', teacherController.login);
teacherRouter.post('/register', teacherController.register);

// teacherController.post('/assignment', teacherController.create)

module.exports = teacherRouter;