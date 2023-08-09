const db = require('../database/connect')

class StudentTeacher {
    constructor({
        student_id, teacher_id
    }) {
        this.student_id = student_id
        this.teacher_id = teacher_id
    }

    static async getTeachersStudents(teacher_id) {
        const resp = await db.query('SELECT * FROM student_teacher WHERE teacher_id = $1',[teacher_id])
        if (resp.rows.length !== 0){
            resp.rows.map((s) => new StudentTeacher(s))  
        }

        const resp2 = await db.query("SELECT students.student_id, username, email, points FROM students LEFT JOIN student_teacher ON students.student_id = student_teacher.student_id WHERE student_teacher.teacher_id = $1",[teacher_id])
        if (resp2.rows.length == 0){
            throw new Error('No students found.')
        }
        return resp2.rows.map((s) => s)
    }
}

module.exports = StudentTeacher
