const Students = require('../models/Students')
require('dotenv').config()
const bcrypt = require('bcrypt')

class StudentsController {
    static async getStudents(req,res) {
        try {
            const students = await Students.getStudents()
            res.status(200).json(students)
        } catch (err) {
            console.log(err)
            res.status(404).json({Error: err.message})
        }
    }
}
