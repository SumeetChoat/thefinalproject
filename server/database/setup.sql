DROP TABLE IF EXISTS assignments, student_teacher, teachers, students;

CREATE TABLE students (
    student_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    token VARCHAR(36),
    points INT DEFAULT 0

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
    completed BOOLEAN DEFAULT false,
    score INT DEFAULT 0,
    hand VARCHAR
);
