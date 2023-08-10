const db = require('../database/connect')

class StudentTeacher {
    constructor({
        student_user, teacher_user
    }) {
        this.student_user = student_user
        this.teacher_user = teacher_user
    }

    static async getTeachersStudents(teacher_user) {
        const resp = await db.query('SELECT * FROM student_teacher WHERE teacher_user = $1',[teacher_user])
        if (resp.rows.length !== 0){
            resp.rows.map((s) => new StudentTeacher(s))  
        }
        // const resp2 = await db.query("SELECT students.student_id, username, email, points FROM students LEFT JOIN student_teacher ON students.student_id = student_teacher.student_id WHERE student_teacher.teacher_id = $1",[teacher_id])
        const resp2 = await db.query('SELECT users.username, points, firstName, lastName FROM users LEFT JOIN student_teacher ON users.username = student_teacher.student_user WHERE student_teacher.teacher_user = $1',[teacher_user])
        if (resp2.rows.length == 0){
            throw new Error('No students found.')
        }
        return resp2.rows.map((s) => s)
    }

    static async assignTeacher(teacher_user,student_user){
        const check = await db.query('SELECT * FROM student_teacher WHERE teacher_user=$1 AND student_user =$2',[teacher_user,student_user])
        if (check.rows.length === 0){
            const resp = await db.query('INSERT INTO student_teacher (teacher_user, student_user) VALUES($1,$2) RETURNING *',[teacher_user,student_user])
            if (resp.rows.length === 0){
                throw new Error('Something went wrong.')
            }
            return new StudentTeacher(resp.rows[0])
        } else {
            return check.rows[0]
        }
    }

    static async removeStudent(teacher_user,student_user) {
        const resp = await db.query('DELETE FROM student_teacher WHERE student_user = $1 AND teacher_user = $2 RETURNING *',[student_user,teacher_user])
        return new StudentTeacher(resp.rows[0])
    }
}

module.exports = StudentTeacher
