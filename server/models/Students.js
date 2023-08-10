const db = require('../database/connect')
const { v4: uuidv4 } = require("uuid")

class Students {
    constructor({
        student_id, username, password,firstName, lastName, email, token, points
    }) {
        this.student_id = student_id
        this.username = username
        this.password = password
        this.email = email
        this.token = token
        this.points = points
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
        if (resp.rows.length == 0){
            throw new Error('Unable to locate student.')
        } else {
            return new Students(resp.rows[0])
        }
    }

    static async createStudent(username) {
        const response = await db.query("INSERT INTO students (username) VALUES ($1) RETURNING username", [username]);
        if (response.rows.length !== 0){
            return Students.getOneByUsername(response.rows[0].username)
        } else {
            throw new Error('Student could not be added.')
        }
    }

    static async updateDetails(student_id, data) {
        const {username, email, firstName, lastName} = data
        const resp = await db.query('UPDATE students SET username = $1, email = $2, firstName =$3, lastName =$4 WHERE student_id = $5 RETURNING *',[username, email, firstName, lastName, student_id])
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
