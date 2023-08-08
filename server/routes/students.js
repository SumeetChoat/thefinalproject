const { Router } = require('express')
const authenticator = require('../middleware/authenticator')

const studentController = require('../controllers/studentsController')
const studentRouter = Router()

studentRouter.get('/', studentController.getStudents)
studentRouter.post('/register', studentController.register)
studentRouter.post('/login', studentController.login)

studentRouter.use(authenticator)

studentRouter.get('/assignments/:id', studentController.getAssignments)
studentRouter.get('/:id', studentController.getOneByID)

studentRouter.delete('/:id', studentController.deleteStudent)
studentRouter.delete('/:id', studentController.logout)

module.exports = studentRouter
