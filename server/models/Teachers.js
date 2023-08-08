const db = require('../database/connect')
const {v4: uuidv4} = require("uuid");

class Teacher {
    constructor({teacher_id, username, password, email, token}) {
        this.teacher_id = teacher_id
        this.username = username
        this.password = password
        this.email = email
        this.token = token
    }

    static async getOneByUsername(username) {
        const response = await db.query("SELECT * FROM teachers WHERE username = $1", [username])

        if (response.rows.length !== 1) {
            throw new Error("Unable to locate teacher.");
        }
        return new Teacher(response.rows[0]);
    }

    static async create(data) {
        const {username, password, email} = data;
        const token = uuidv4();
        const response = await db.query("INSERT INTO teachers (username, password, email, token) VALUES ($1, $2, $3, $4) RETURNING username", [username, password, email, token]);
        console.log(response)
        return Teacher.getOneByUsername(response.rows[0].username)
    }

    //This needs to be in the assignments model
    // static async createAssignment(data) {
    //     const {student_id, teacher_id, range, pattern, hand} = data

    //     const response = await db.query("INSERT INTO assignments(student_id, teacher_id, range, pattern, completed, score, hand) VALUES ($1, $2, $3, $4, false, 0, $5) RETURNING assignment_id", [student_id, teacher_id, range, pattern, hand]);

    //     return await Assignment.getOneById(response.rows[0].assignment_id)
    // }
}

module.exports = Teacher
