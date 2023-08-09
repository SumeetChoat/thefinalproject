const db = require('../database/connect')

class Assignments {
    constructor(assignment_id, student_id, teacher_id, range, pattern, completed, score, hand){
        this.assignment_id = assignment_id
        this.student_id = student_id
        this.teacher_id = teacher_id
        this.range = range
        this.pattern = pattern
        this.completed = completed
        this.score = score
        this.hand = hand
    }

    static async getStudentsAssignments(student_id) {
        const resp = await db.query("SELECT * FROM assignments WHERE student_id = $1",[student_id])
        if (resp.rows.length == 0){
            throw new Error("You have no assignments.")
        }
        return resp.rows.map((a) => new Assignments(a))
    }

    static async getTeachersAssignments(teacher_id) {
        const resp = await db.query("SELECT * FROM assignments WHERE teacher_id = $1",[teacher_id])
        if (resp.rows.length === 0){
            throw new Error('You have not created any assignments.')
        }
        return resp.rows.map((a) => new Assignments(a))
    }

    static async getOneByID(assignment_id) {
        const resp = await db.query("SELECT * FROM assignments WHERE assignment_id = $1",[assignment_id])
        if (resp.rows.length !== 1){
            throw new Error("Unable to locate assignment.")
        } else {
            return new Assignments(resp.rows[0])
        }
    }

    static async createAssignment(data) {
        const {student_id,teacher_id,range,pattern,completed,score,hand} = data
        const resp = await db.query("INSERT INTO assignments (student_id,teacher_id,range,pattern,completed,score,hand) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",[student_id,teacher_id,range,pattern,completed,score,hand])
        const id = resp.rows[0].assignment_id
        return await Assignments.getOneByID(id)
    }

    static async updateAssignment(assignment_id, data) {
        const {range,pattern,completed,score,hand} = data
        const resp = await db.query("UPDATE assignments SET range=$1, pattern=$2, completed=$3, score=$4, hand=$5 WHERE assignment_id=$6 RETURNING assignment_id",[range,pattern,completed,score,hand,assignment_id])
        const newAssignment = await Assignments.getOneByID(resp.assignment_id)
        return newAssignment
    }

    async deleteAssignment() {
        const resp = await db.query("DELETE FROM assignments WHERE assignment_id = $1 RETURNING *",[this.assignment_id])
        return new Assignments(resp.rows[0])
    }
}

module.exports = Assignments
