const db = require('./connect');

async function createDBEnv() {
    await db.query(`CREATE TABLE students (
        student_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        username VARCHAR NOT NULL,
        password VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        token VARCHAR(36)
    );
    
    CREATE TABLE teachers (
        teacher_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        username VARCHAR NOT NULL,
        password VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        token VARCHAR (36)
    );
    
    CREATE TABLE student_teacher (
        student_id INT REFERENCES students(student_id),
        teacher_id INT REFERENCES teachers(teacher_id)
    );
    
    CREATE TABLE assignments (
        assignment_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        student_id INT REFERENCES students(student_id),
        teacher_id INT REFERENCES teachers(teacher_id),
        range INT ARRAY,
        pattern INT ARRAY,
        completed BOOLEAN,
        score INT,
        hand VARCHAR
    );`)

    console.log("Mock database environment created")
}


async function destroyDBEnv() {
    await db.query(`DROP TABLE IF EXISTS assignments, student_teacher, teachers, students;`);

    console.log("Mock database environment destroyed");
}

module.exports = {createDBEnv, destroyDBEnv};