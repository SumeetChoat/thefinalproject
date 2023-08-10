const db = require('../database/connect')

class Students {
    constructor({
        username, points
    }) {
        this.username = username
        this.points = points
    }

    static async getStudents() {
        const resp = await db.query("SELECT * FROM students")
        if (resp.rows.length == 0) {
            throw new Error('There are no students.')
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

    static async createStudent(username) {
        const response = await db.query("INSERT INTO students (username) VALUES ($1) RETURNING username", [username]);
        if (response.rows.length !== 0){
            return Students.getOneByUsername(response.rows[0].username)
        } else {
            throw new Error('Student could not be added.')
        }
    }

    // static async updateDetails(student_id, data) {
    //     const {username, email, firstName, lastName} = data
    //     const resp = await db.query('UPDATE students SET username = $1, email = $2, firstName =$3, lastName =$4 WHERE student_id = $5 RETURNING *',[username, email, firstName, lastName, student_id])
    //     const updatedStudent = await Students.getOneByID(resp.rows[0].student_id)
    //     return updatedStudent
    // }

    async deleteStudent() {
        await db.query("DELETE FROM student_teacher WHERE username = $1",[this.username])
        await db.query("DELETE FROM tokens WHERE username = $1",[this.username])
        const result = await db.query("DELETE FROM students WHERE username = $1 RETURNING *",[this.username])
        return new Students(result.rows[0])
    }
}

module.exports = Students
