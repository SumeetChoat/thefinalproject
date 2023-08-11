const { Router } = require('express')
const authenticator = require('../middleware/authenticator')

const studentController = require('../controllers/studentsController')
const studentRouter = Router()

studentRouter.use(authenticator)

studentRouter.get('/', studentController.getStudents)

studentRouter.get('/assignments/', studentController.getAssignments)
studentRouter.get('/assignment/',studentController.getAssignmentByID)

studentRouter.patch('/assignment/update', studentController.updateAssignment)
studentRouter.patch('/assignment/complete', studentController.completeAssignment)

studentRouter.patch('/teacher', studentController.assignTeacher)

studentRouter.delete('/delete', studentController.deleteStudent)

module.exports = studentRouter
