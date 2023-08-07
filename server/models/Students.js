const db = require('../database/connect')
const { v4: uuidv4 } = require("uuid")

class Students {
    constructor({
        student_id, username, password, email, token, points
    }) {
        this.student_id = student_id
        this.username = username
        this.password = password
        this.email = email
        this.token = token
        this.points = points
    }

    static async createStudent(data) {
        const { username, password, email, points } = data
        const token = uuidv4()
        const resp = await db.query("INSERT INTO students (username,password,email,points,token) VALUES ($1,$2,$3,$4,$5) RETURNING student_id",[username, password, email, points, token])
        const id = resp.rows[0].student_id
        const newStudent = await Students.getOneByID(id)
        return newStudent
    }

    static async getOneByID(id) {
        const resp = await db.query("SELECT * FROM students WHERE student_id = $1",[id])
        return new Students(resp.rows[0])
    }

    static async getByUsername(username) {
        const resp = await db.query("SELECT * FROM students WHERE username = $1",[username])
    }

    static async getStudents() {
        const resp = await db.query("SELECT user_id,username,email,token,score")
        if (resp.rows.length == 0) {
            throw new Error('There are no users')
        } else {
            return resp.rows.map((s) => new Students(s))
        }
    }

    static async getAssignments(student_id) {
        const resp = await db.query("SELECT * FROM assignments WHERE student_id = $1",[student_id])
        if (resp.rows.length == 0) {
            throw new Error('There are no assignments')
        } else {
            return resp.rows.map((a) => a)
        }
    }
}

module.exports = Students
