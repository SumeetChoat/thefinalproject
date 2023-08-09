const db = require('../database/connect')
const { v4: uuidv4 } = require("uuid")
const StudentTeacher = require('./StudentTeacher')

class Students {
    constructor({
        student_id, username, password,firstName, lastName, email, token, points, teacher_username
    }) {
        this.student_id = student_id
        this.username = username
        this.password = password
        this.email = email
        this.token = token
        this.points = points
        this.teacher_username = teacher_username
        this.firstName = firstName
        this.lastName = lastName
    }

    static async getStudents() {
        const resp = await db.query("SELECT student_id,username,email,token,points FROM students")
        if (resp.rows.length == 0) {
            throw new Error('There are no students')
        } else {
            return resp.rows.map((s) => new Students(s))
        }
    }

    static async getOneByUsername(username) {
        const resp = await db.query("SELECT * FROM students WHERE username = $1",[username])
        if (resp.rows.length !== 1){
            throw new Error("Unable to locate student.")
        } else {
            return new Students(resp.rows[0])
        }
    }

    static async getOneByID(id) {
        const resp = await db.query("SELECT * FROM students WHERE student_id = $1",[id])
        return new Students(resp.rows[0])
    }

    static async createStudent(data) {
        const { username, password, firstName, lastName, email, points, teacher_username } = data
        const token = uuidv4()
        const resp = await db.query("INSERT INTO students (username,password,firstName,lastName,email,points,token, teacher_username) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING student_id",[username, password, firstName, lastName, email, points, token, teacher_username])
        const id = resp.rows[0].student_id
        const newStudent = await Students.getOneByID(id)

        if (teacher_username !== null){
            await StudentTeacher.assignTeacher(teacher_username, id)
            return newStudent
        } else {
            return newStudent
        }
    }

    static async updateDetails(student_id, data) {
        const {username, email, firstName, lastName, teacher_username} = data
        const resp = await db.query('UPDATE students SET username = $1, email = $2, firstName =$3, lastName =$4, teacher_username =$5 WHERE student_id = $6 RETURNING *',[username, email, firstName, lastName, teacher_username, student_id])
        const updatedStudent = await Students.getOneByID(resp.rows[0].student_id)
        return updatedStudent
    }

    async deleteStudent() {
        const resp = await db.query("DELETE FROM student_teacher WHERE student_id = $1",[this.student_id])
        const resp2 = await db.query("DELETE FROM students WHERE student_id = $1 RETURNING *",[this.student_id])
        return new Students(resp2.rows[0])
    }
}

module.exports = Students
