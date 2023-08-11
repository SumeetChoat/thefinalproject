const db = require('../database/connect')

class Teacher {
    constructor({username, title}) {
        this.username = username
        this.title = title
    }

    static async getOneByUsername(username) {
        const response = await db.query("SELECT * FROM teachers WHERE username = $1", [username])

        if (response.rows.length !== 1) {
            throw new Error("Unable to locate teacher.");
        }
        return new Teacher(response.rows[0]);
    }

    static async createTeacher(username,title) {
        console.log(title)
        const response = await db.query("INSERT INTO teachers (username, title) VALUES ($1, $2) RETURNING username", [username,title]);
        console.log(response)
        if (response.rows.length !== 0){
            return Teacher.getOneByUsername(response.rows[0].username)
        } else {
            throw new Error('Teacher could not be added.')
        }
    }

    async deleteTeacher() {
        await db.query("DELETE FROM student_teacher WHERE teacher_user = $1",[this.username])
        await db.query("DELETE FROM tokens WHERE username = $1",[this.username])
        const result = await db.query("DELETE FROM teachers WHERE username = $1 RETURNING *",[this.username])
        await db.query('DELETE FROM users WHERE username = $1',[this.username])
        return new Teacher(result.rows[0])
    }
}

module.exports = Teacher
