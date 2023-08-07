const db = require('../database/connect')

class Students {
    constructor({
        student_id, username, password, email, token, points
    }) {
        this.student_id = student_id
        this.username = username
        this.password = password
        this.email = email
        this.token = token
        this.point = points
    }

    static async getStudents() {
        const resp = await db.query("SELECT user_id,username,email,token,score")
        if (resp.rows.length == 0) {
            throw new Error('There are no users')
        } else {
            return resp.rows.maps((s) => new Students(s))
        }
    }
}

module.exports = Students
