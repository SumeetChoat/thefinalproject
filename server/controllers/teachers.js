const bcrypt = require("bcrypt");
const Assignments = require('../models/Assignments')
const Teacher = require('../models/Teachers');
const StudentTeacher = require('../models/StudentTeacher')

async function createTeacher(req, res) {
    try {
        const data = req.body;
        const result = await Teacher.create(data);
        res.status(201).send(result)
    } catch(err) {
        res.status(400).json({"error": err.message})
    }
}

async function login(req, res) {
    try {
        const data = req.body;

        const teacher = await Teacher.getOneByUsername(data.username);

        const authenticated = await bcrypt.compare(data.password, teacher["password"]);


        if (!authenticated) {
            throw new Error("Incorrect credentials.")
        } else {
            res.status(200).send(teacher)
        }
    } catch(err) {
        res.status(403).json({"error": err.message})
    }
}

async function createAssignment(req, res) {
    try {
        const data = req.body
        const assignment = await Assignments.createAssignment(data) 
        res.status(200).send(assignment)
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
}

async function deleteAssignment(req,res) {
    try {
        const assignment_id = req.body.assignment_id
        const result = await Assignments.deleteAssignment(assignment_id)
        res.status(204).send(result)
    } catch (err) {
        res.status(403).json({"error": err.message})
    }
}

async function getStudents(req,res) {
    try {
        const username = req.headers["username"]
        const teacher = await Teacher.getOneByUsername(username)
        const students = await StudentTeacher.getTeachersStudents(teacher.teacher_id)
        res.status(200).send(students)
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

async function getCreatedAssignments(req,res) {
    try {
        const username = req.headers["username"]
        const teacher = await Teacher.getOneByUsername(username)
        const assignments = await Assignments.getTeachersAssignments(teacher.teacher_id)
        res.status(200).send(assignments)
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}


async function updateAssignment(req,res) {
    try {
        const assignment_id = req.body.assignment_id
        const data = req.body
        const assignment = await Assignments.updateAssignment(assignment_id, data)
        res.status(200).send(assignment)
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
}


async function removeStudent(req,res) {
    try {
        const student_id = req.body.student_id
        const username = req.headers["username"]
        const teacher = await Teacher.getOneByUsername(username)
        //delete their assignments
        const result = await StudentTeacher.removeStudent(student_id,teacher.teacher_id)
        res.status(204).send(result)
    } catch (err) {
        res.status(403).json({"error": err.message})
    }
}

module.exports = {createTeacher, login, createAssignment, getStudents, getCreatedAssignments, removeStudent, deleteAssignment, updateAssignment};
