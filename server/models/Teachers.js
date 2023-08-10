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

    static async create(username,title) {
        const response = await db.query("INSERT INTO teachers (username, title) VALUES ($1, $2) RETURNING username", [username,title]);
        console.log(response)
        if (response.rows.length !== 0){
            return Teacher.getOneByUsername(response.rows[0].username)
        } else {
            throw new Error('Teacher could not be added.')
        }
    }
}

module.exports = Teacher
