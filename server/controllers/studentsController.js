const Assignments = require('../models/Assignments')
const StudentTeacher = require('../models/StudentTeacher')
const Students = require('../models/Students')

class StudentsController {
    static async assignTeacher(req,res) {
        try {
            const teacher_username = req.body.teacher_username
            const student_username = req.tokenObj.username

            const result = await StudentTeacher.assignTeacher(teacher_username, student_username)
            res.status(200).send(result)
        } catch (err) {
            res.status(500).json({"error": err.message})
        }
    }

    static async getStudents(req,res) {
        try {
            const students = await Students.getStudents()
            res.status(200).send(students)
        } catch (err) {
            res.status(404).json({"Error": err.message})
        }
    }

    static async getAssignments(req,res) {
        try {
            const username = req.tokenObj.username
            const assignments = await Assignments.getStudentsAssignments(username)
            res.status(200).send(assignments)
        } catch (err) {
            console.log(err)
            res.status(404).json({"Error": err.message})
        }
    }

    static async getAssignmentByID(req, res) {
        try {
            const assignment_id = req.body.assignment_id
            const assignment = await Assignments.getOneByID(assignment_id)
            res.status(200).send(assignment)
        } catch (err) {
            console.log(err)
            res.status(404).json({"Error": err.message})
        }
    }

    static async updateAssignment(req,res) {
        try {
            const assignment_id = req.body.assignment_id
            const data = req.body
            const assignment = await Assignments.updateAssignment(assignment_id, data)
            res.status(200).send(assignment)
        } catch (err) {
            res.status(500).json({"error": err.message})
        }
    }

    static async completeAssignment(req,res) {
        try {
            const data = req.body
            const assignment = await Assignments.completeAssignment(data)
            res.status(200).send(assignment)
        } catch (err) {
            res.status(500).json({"error": err.message})
        }
    }

    static async deleteStudent(req,res) {
        try {
            const username = req.tokenObj.username
            const student = await Students.getOneByUsername(username)
            const resp = await student.deleteStudent()
            res.status(204).send(resp)
        } catch (err) {
            console.log(err)
            res.status(403).json({"Error": err.message})
        }
    }
}

module.exports = StudentsController
