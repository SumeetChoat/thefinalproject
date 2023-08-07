const { Router } = require('express')

const studentController = require('../controllers/studentsController')
const studentRouter = Router()

studentRouter.get('/', studentController.getStudents)
studentRouter.post('/register', studentController.register)
studentRouter.post('/login', studentController.login)

//authenticator

studentRouter.get('/assignments', studentController.getAssignments)
studentRouter.get('/student', studentController.getOneByID)

studentRouter.delete('/delete', studentController.deleteStudent)
studentRouter.delete('/logout', studentController.logout)

module.exports = studentRouter
