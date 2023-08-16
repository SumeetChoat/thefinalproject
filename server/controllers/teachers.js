const bcrypt = require("bcrypt");
const Assignments = require("../models/Assignments");
const Teacher = require("../models/Teachers");
const StudentTeacher = require("../models/StudentTeacher");

async function createTeacher(req, res) {
  try {
    const data = req.body;
    const result = await Teacher.create(data);
    res.status(201).send(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function createAssignment(req, res) {
  try {
    const data = req.body;
    console.log(data);
    const assignment = await Assignments.createAssignment(data);
    res.status(200).send(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteAssignment(req, res) {
  try {
    const assignment_id = req.body.assignment_id;
    const result = await Assignments.deleteAssignment(assignment_id);
    console.log("CONTROLLER: ", result)
    res.status(204).send(result);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
}

async function getStudents(req, res) {
  try {
    const username = req.tokenObj.username;
    const students = await StudentTeacher.getTeachersStudents(username);
    res.status(200).send(students);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function getCreatedAssignments(req, res) {
  try {
    const username = req.tokenObj.username;
    const assignments = await Assignments.getTeachersAssignments(username);
    res.status(200).send(assignments);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function updateAssignment(req, res) {
  try {
    console.log("run");
    const assignment_id = req.body.assignment_id;
    const data = req.body;
    const assignment = await Assignments.updateAssignment(assignment_id, data);
    res.status(200).send(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function removeStudent(req, res) {
  try {
    const student_username = req.body.student_username;
    const teacher_username = req.tokenObj.username;
  
    await Assignments.deleteStudentsAssignments(student_username);
    const result = await StudentTeacher.removeStudent(
      teacher_username,
      student_username
    );
    res.status(204).send(result);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
}

async function deleteTeacher(req, res) {
  try {
    const username = req.tokenObj.username;
    await Assignments.deleteTeachersAssignments(username);
    const teacher = await Teacher.getOneByUsername(username);
    const result = await teacher.deleteTeacher();
    res.status(204).send(result);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
}

module.exports = {
  createTeacher,
  createAssignment,
  getStudents,
  getCreatedAssignments,
  removeStudent,
  deleteAssignment,
  updateAssignment,
  deleteTeacher,
};
