const bcrypt = require("bcrypt");
const Assignment = require('../models/Assignments')
const Teacher = require('../models/Teachers');
const StudentTeacher = require('../models/StudentTeacher')

async function register(req, res) {
    try {
        const data = req.body;

        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
        data["password"] = await bcrypt.hash(data["password"], salt);

        const result = await Teacher.create(data);
        res.status(201).send(result);

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

async function create(req, res) {
    try {
        const data = req.body
        const assignment = await Assignment.createAssignment(data) 
        res.status(200).send(assignment)
    } catch (err) {
        res.status(500).json({"error": err.message})
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

module.exports = {register, login, create, getStudents};
