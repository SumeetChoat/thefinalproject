const {Router} = require('express')
const authenticator = require('../middleware/authenticator')
const teacherController = require('../controllers/teachers')

const teacherRouter = Router();

teacherRouter.post('/login', teacherController.login);
teacherRouter.post('/register', teacherController.register);

teacherController.use(authenticator)

teacherController.post('/assignment', teacherController.create)
teacherController.get('/students',teacherController.getStudents)

module.exports = teacherRouter;
