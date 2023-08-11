const db = require('../database/connect')

class Assignments {
    constructor({
        assignment_id, student_user, teacher_user, range, pattern, completed, score, clef, rounds,
        key, date_assigned, date_completed
    }){
        this.assignment_id = assignment_id
        this.student_user = student_user
        this.teacher_user = teacher_user
        this.range = range
        this.pattern = pattern
        this.completed = completed
        this.score = score
        this.clef = clef
        this.rounds = rounds
        this.key = key
        this.date_assigned = date_assigned
        this.date_completed = date_completed
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
        if (resp.rows.length === 0){
            throw new Error("Unable to locate assignment.")
        } else {
            return new Assignments(resp.rows[0])
        }
    }

    static async createAssignment(data) {
        const {student_id,teacher_id,range,pattern,completed,score,clef,key,date_assigned,date_completed} = data
        const resp = await db.query(`INSERT INTO assignments
         (student_id,teacher_id,range,pattern,completed,score,clef,key,date_assigned,date_completed) 
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) 
         RETURNING *`,[
            student_id,teacher_id,range,pattern,completed,score,clef,key,date_assigned,date_completed
        ])
        const id = resp.rows[0].assignment_id
        const assignment = await Assignments.getOneByID(id)
        return assignment
    }

    static async updateAssignment(assignment_id, data) {
        const current = await Assignments.getOneByID(assignment_id)
        const {range,pattern,completed,score,clef, key} = data
        const resp = await db.query(`UPDATE assignments 
        SET range=$1, pattern=$2, completed=$3, score=$4, clef=$5, key=$6
        WHERE assignment_id=$7
        RETURNING assignment_id`,
        [
            range || current.range, pattern || current.pattern,
            completed || current.completed ,score || current.score,
            clef || current.clef, key || current.key,
            assignment_id
        ])
        const updatedAssignment = await Assignments.getOneByID(resp.rows[0].assignment_id)
        return updatedAssignment
    }

    static async completeAssignment(data) {
        const {assignment_id,score} = data
        const resp = await db.query("UPDATE assignments SET completed=$1,score=$2 WHERE assignment_id = $3 RETURNING assignment_id",[true,score,assignment_id])
        const updatedAssignment = await Assignments.getOneByID(resp.rows[0].assignment_id)
        return updatedAssignment
    }

    static async deleteAssignment() {
        const resp = await db.query("DELETE FROM assignments WHERE assignment_id = $1 RETURNING *",[this.assignment_id])
        return new Assignments(resp.rows[0])
    }

    static async deleteStudentsAssignments(student_user) {
        const resp = await db.query("DELETE FROM assignments WHERE student_user = $1 RETURNING *",[student_user])
        return resp.rows.map((a) => new Assignments(a))
    }

    static async deleteTeachersAssignments(teacher_user) {
        const resp = await db.query("DELETE FROM assignments WHERE teacher_user = $1 RETURNING *",[teacher_user])
        return resp.rows.map((a) => new Assignments(a))
    }
}

module.exports = Assignments
