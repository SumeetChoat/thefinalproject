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

    static async updatePoints(points,username) {
        const currentPoints = await db.query('SELECT points FROM students WHERE username = $1',[username])
        const newPoints = currentPoints.rows[0].points + points
        const response = await db.query('UPDATE students SET points = $1 WHERE username =$2 RETURNING username',[newPoints,username])
        if (response.rows.length !== 0){
            return Students.getOneByUsername(response.rows[0].username)
        } else {
            throw new Error('Student could not be updated.')
        }
    }

    async deleteStudent() {
        await db.query("DELETE FROM student_teacher WHERE student_user = $1",[this.username])
        await db.query("DELETE FROM tokens WHERE username = $1",[this.username])
        const result = await db.query("DELETE FROM students WHERE username = $1 RETURNING *",[this.username])
        await db.query('DELETE FROM users WHERE username = $1',[this.username])
        return new Students(result.rows[0])
    }
}

module.exports = Students
