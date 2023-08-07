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
            console.log(err)
            res.status(500).json({Error: err.message})
        }
    }

    static async login(req,res) {
        try {
            const data = req.body
            const student = await Students.getByUsername(data.username)
            const auth = await bcrypt.compare(
                data.password,
                student["password"]
            )
            if (!auth) {
                throw new Error("Wrong username or password")
            } else {
                res.status(200).json({authenticated: true, token: student["token"], username: student["username"]})
            }
        } catch (err) {
            console.log(err)
            res.status(403).json({Error: err.message})
        }
    }

    static async getStudents(req,res) {
        try {
            const students = await Students.getStudents()
            res.status(200).json(students)
        } catch (err) {
            console.log(err)
            res.status(404).json({Error: err.message})
        }
    }

    static async getOneByID(req,res) {
        try {
            // token
            const id = 1
            const student = await Students.getOneByID(id)
            delete student.password
            res.status(200).send(student)
        } catch (err) {
            console.log(err)
            res.status(404).json({Error: err.message})
        }
    }

    static async getAssignments(req,res) {
        try {
            // token auth
            const id = 1
            const assignments = await Students.getAssignments(id)
            res.status(200).json(assignments)
        } catch (err) {
            console.log(err)
            res.status(404).json({Error: err.message})
        }
    }

    static async logout(req,res) {
        try {
            // token
            const id = req.body.student_id
            const student = await Students.getOneByID(id)
            res.status(202).json({ message: student})
        } catch (err) {
            console.log(err)
            res.status(403).json({Error: err.message})
        }
    }

    static async deleteUser(req,res) {
        try {
            const id = req.body.student_id
            const student = await Students.getOneByID(id)
            const resp = await student.deleteStudent(id)
            res.status(204).json(resp)
        } catch (err) {
            console.log(err)
            res.status(403).json({Error: err.message})
        }
    }
}

module.export = StudentsController
