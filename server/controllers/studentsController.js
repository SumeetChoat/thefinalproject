const Assignments = require('../models/Assignments')
const Students = require('../models/Students')
require('dotenv').config()
const bcrypt = require('bcrypt')

class StudentsController {
    static async register(req,res) {
        try {
            const data = req.body
            const rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) 

            const salt = await bcrypt.genSalt(rounds)
            data["password"] = await bcrypt.hash(data["password"],salt)

            const student = await Students.createStudent(data)
            res.status(201).send(student)
        } catch (err) {
            res.status(500).json({"Error": err.message})
        }
    }

    static async login(req,res) {
        try {
            const data = req.body
            const student = await Students.getOneByUsername(data.username)
            const authenticated = await bcrypt.compare(
                data.password,
                student["password"]
            )
            if (!authenticated) {
                throw new Error("Incorrect credentials")
            } else {
                res.status(200).json(student)
            }
        } catch (err) {
            res.status(403).json({"Error": err.message})
        }
    }

    static async getStudents(req,res) {
        try {
            const students = await Students.getStudents()
            res.status(200).json(students)
        } catch (err) {
            res.status(404).json({"Error": err.message})
        }
    }

    static async getOneByID(req,res) {
        try {
            const student_id = req.body.student_id
            const student = await Students.getOneByID(student_id)

            delete student.password
            res.status(200).send(student)
        } catch (err) {
            console.log(err)
            res.status(404).json({"Error": err.message})
        }
    }

    static async getAssignments(req,res) {
        try {
            const username = req.body["username"]
            const student = await Students.getOneByUsername(username)

            const assignments = await Assignments.getStudentsAssignments(student.student_id)
            res.status(200).json(assignments)
        } catch (err) {
            console.log(err)
            res.status(404).json({"Error": err.message})
        }
    }

    static async getAssignmentByID(req, res) {
        try {
            const assignment_id = req.body.assignment_id
            const assignment = await Assignments.getOneByID(assignment_id)
            res.status(200).json(assignment)
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
            res.status(200).json(assignment)
        } catch (err) {
            console.log(err)
        }
    }

    static async logout(req,res) {
        try {
            const username = req.body["username"]
            const student = await Students.getOneByUsername(username)
            // this doesn't actually do anything
            res.status(202).json({ message: student})
        } catch (err) {
            console.log(err)
            res.status(403).json({"Error": err.message})
        }
    }

    static async deleteStudent(req,res) {
        try {
            const username = req.body["username"]
            const student = await Students.getOneByUsername(username)
            
            const resp = await student.deleteStudent(student.student_id)
            res.status(204).json(resp)
        } catch (err) {
            console.log(err)
            res.status(403).json({"Error": err.message})
        }
    }
}

module.exports = StudentsController
