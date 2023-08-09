import db from "../database/connect";
import Students from "./Students";

class StudentTeacher {
    constructor({
        student_id, teacher_id
    }) {
        this.student_id = student_id
        this.teacher_id = teacher_id
    }

    static async getTeachersStudents(teacher_id) {
        const resp = await db.query('SELECT * FROM student_teacher WHERE teacher_id = $1',[teacher_id])
        if (resp.rows.length == 0){
            throw new Error('No students found.')
        }
        resp.rows.map((s) => new StudentTeacher(s))
        return resp.rows.map(async(s) => {
            const student =  await Students.getOneByID(s.student_id)
            console.log(student)
            return student
        })
    }
}

module.exports = StudentTeacher
