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

    static async assignTeacher(teacher_username,student_id){
        const teacher = await db.query('SELECT teacher_id FROM teachers WHERE username = $1',[teacher_username])
        console.log(teacher.rows[0].teacher_id)
        const teacher_id = teacher.rows[0].teacher_id

        const check = await db.query('SELECT * FROM student_teacher WHERE teacher_id=$1 AND student_id =$2',[teacher_id,student_id])
        if (check.rows.length === 0){
            const resp = await db.query('INSERT INTO student_teacher (teacher_id, student_id) VALUES($1,$2) RETURNING *',[teacher_id,student_id])
            if (resp.rows.length === 0){
                throw new Error('Something went wrong.')
            }
            return new StudentTeacher(resp.rows[0])
        } else {
            return check.rows[0]
        }
    }

    static async removeStudent(teacher_id,student_id) {
        const resp = await db.query('DELETE FROM student_teacher WHERE student_id = $1 AND teacher_id = $2 RETURNING *',[student_id,teacher_id])
        return new StudentTeacher(resp.rows[0])
    }
}

module.exports = StudentTeacher
