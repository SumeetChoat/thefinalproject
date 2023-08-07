const { Router } = require('express')

const studentController = require('../controllers/studentsController')
const studentRouter = Router()

studentRouter.get('/', studentController.getStudents)

module.exports = studentRouter
