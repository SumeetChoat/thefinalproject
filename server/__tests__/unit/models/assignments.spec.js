const db = require('../../../database/connect');
const Assignments = require('../../../models/Assignments');

const data = {rows:[
    {
        "assignment_id":1,
        "student_id":1,
        "teacher_id":1,
        "range":[0,1],
        "pattern":[0,1],
        "completed":false,
        "score":0,
        "hand":"left"
    }
]}