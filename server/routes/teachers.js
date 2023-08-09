const {Router} = require('express')
const authenticator = require('../middleware/authenticator')
const teacherController = require('../controllers/teachers')

const teacherRouter = Router();

teacherRouter.post('/login', teacherController.login);
teacherRouter.post('/register', teacherController.register);

teacherRouter.use(authenticator)

teacherRouter.post('/assignment', teacherController.create)
teacherRouter.get('/students',teacherController.getStudents)
teacherRouter.get('/assignments', teacherController.getCreatedAssignments)

module.exports = teacherRouter;
