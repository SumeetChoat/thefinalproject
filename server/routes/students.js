const { Router } = require('express')
const authenticator = require('../middleware/authenticator')

const studentController = require('../controllers/studentsController')
const studentRouter = Router()

studentRouter.get('/', studentController.getStudents)
studentRouter.post('/register', studentController.register)
studentRouter.post('/login', studentController.login)

studentRouter.use(authenticator)

studentRouter.get('/assignments/', studentController.getAssignments)
studentRouter.get('/assignment/',studentController.getAssignmentByID)
studentRouter.patch('/assignment/update', studentController.updateAssignment)
studentRouter.patch('/assignment/complete', studentController.completeAssignment)
studentRouter.get('/student', studentController.getOneByID)

studentRouter.patch('/teacher', studentController.assignTeacher)

studentRouter.delete('/delete', studentController.deleteStudent)
studentRouter.delete('/logout', studentController.logout)

module.exports = studentRouter
