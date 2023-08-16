const db = require("../database/connect");

class Assignments {
  constructor({
    assignment_id,
    student_user,
    teacher_user,
    range,
    pattern,
    completed,
    score,
    clef,
    rounds,
    key,
    date_assigned,
    date_completed,
    time_taken,
    is_random,
    random_length
  }) {
    this.assignment_id = assignment_id;
    this.student_user = student_user;
    this.teacher_user = teacher_user;
    this.range = range;
    this.pattern = pattern;
    this.completed = completed;
    this.score = score;
    this.clef = clef;
    this.rounds = rounds;
    this.key = key;
    this.date_assigned = date_assigned;
    this.date_completed = date_completed;
    this.time_taken = time_taken;
    this.is_random = is_random;
    this.random_length = random_length;
  }

  static async getStudentsAssignments(student_user) {
    const resp = await db.query(
      "SELECT * FROM assignments WHERE student_user = $1",
      [student_user]
    );
    if (resp.rows.length == 0) {
      throw new Error("You have no assignments.");
    }
    return resp.rows.map((a) => new Assignments(a));
  }

  static async getTeachersAssignments(teacher_user) {
    const resp = await db.query(
      `
        SELECT assignments.*, users.first_name as teacher_first_name, users.last_name as teacher_last_name, teachers.title FROM assignments LEFT JOIN users ON users.username = assignments.teacher_user LEFT JOIN teachers ON teachers.username = assignments.teacher_user WHERE assignments.teacher_user = $1
        `,
      [teacher_user]
    );

    if (resp.rows.length === 0) {
      throw new Error("You have not created any assignments.");
    }
    resp.rows.map((a) => {
      new Assignments(a);
    });
    return resp.rows.map((r) => r);
  }

  static async getOneByID(assignment_id) {
    const resp = await db.query(
      "SELECT * FROM assignments WHERE assignment_id = $1",
      [assignment_id]
    );
    if (resp.rows.length === 0) {
      throw new Error("Unable to locate assignment.");
    } else {
      return new Assignments(resp.rows[0]);
    }
  }

  static async createAssignment(data) {
    const {
      student_user,
      teacher_user,
      range,
      pattern,
      completed = false,
      score = 0,
      clef,
      key = "C",
      rounds,
      is_random,
      random_length = 0,
    } = data;
    console.log(
      student_user,
      teacher_user,
      range,
      pattern,
      completed,
      score,
      clef,
      key,
      rounds,
      is_random,
      random_length
    );
    const resp = await db.query(
      `INSERT INTO assignments
         (student_user,teacher_user,range,pattern,completed,score,clef,key,rounds,is_random,random_length)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
         RETURNING *`,
      [
        student_user,
        teacher_user,
        range,
        pattern,
        completed,
        score,
        clef,
        key,
        rounds,
        is_random,
        random_length,
      ]
    );
    const id = resp.rows[0].assignment_id;
    const assignment = await Assignments.getOneByID(id);
    return assignment;
  }

  static async updateAssignment(assignment_id, data) {
    const current = await Assignments.getOneByID(assignment_id);
    const { range, pattern, completed, score, clef, key } = data;
    console.log(current);
    const resp = await db.query(
      `UPDATE assignments 
        SET range=$1, pattern=$2, completed=$3, score=$4, clef=$5, key=$6
        WHERE assignment_id=$7
        RETURNING assignment_id`,
      [
        range || current.range,
        pattern || current.pattern,
        completed || current.completed,
        score || current.score,
        clef || current.clef,
        key || current.key,
        assignment_id,
      ]
    );
    const updatedAssignment = await Assignments.getOneByID(
      resp.rows[0].assignment_id
    );
    return updatedAssignment;
  }

  static async completeAssignment(data) {
    const { assignment_id, score, date_completed, time_taken } = data;
    const resp = await db.query(
      `UPDATE assignments
        SET completed=$1,score=$2,time_taken=$3,date_completed=$4
        WHERE assignment_id = $5
        RETURNING assignment_id`,
      [true, score, time_taken, date_completed, assignment_id]
    );
    const updatedAssignment = await Assignments.getOneByID(
      resp.rows[0].assignment_id
    );
    return updatedAssignment;
  }

  static async deleteAssignment(assignment_id) {
    const resp = await db.query(
      "DELETE FROM assignments WHERE assignment_id = $1 RETURNING *",
      [assignment_id]
    );
    return new Assignments(resp.rows[0]);
  }

  static async deleteStudentsAssignments(student_user) {
    const resp = await db.query(
      "DELETE FROM assignments WHERE student_user = $1 RETURNING *",
      [student_user]
    );
    return resp.rows.map((a) => new Assignments(a));
  }

  static async deleteTeachersAssignments(teacher_user) {
    const resp = await db.query(
      "DELETE FROM assignments WHERE teacher_user = $1 RETURNING *",
      [teacher_user]
    );
    return resp.rows.map((a) => new Assignments(a));
  }
}

module.exports = Assignments;
