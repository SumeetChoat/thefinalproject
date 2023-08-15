const db = require('./connect');

async function createDBEnv() {
    await db.query(`
    DROP TABLE IF EXISTS assignments, student_teacher, teachers, students, users, tokens, friends, friend_requests, messages, notifications;

    CREATE TABLE users (
        username VARCHAR PRIMARY KEY,
        password VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        first_name VARCHAR,
        last_name VARCHAR,
        role VARCHAR,
        title VARCHAR
    );
    INSERT INTO users (username, password, email, first_name, last_name, role) VALUES
    ('teacher1','$2b$10$tAjZ69EPEjR0jiQq3885OehITkaILgNK4pJK/RkL6L4MRDPeQN4.i', 'anthonychan1211@gmail.com', 'teacher1', 'chan', 'teacher'),
    ('teacher2','$2b$10$tAjZ69EPEjR0jiQq3885OehITkaILgNK4pJK/RkL6L4MRDPeQN4.i', 'anthonytestcode@yahoo.com', 'teacher2', 'chan', 'teacher'),
    ('student1','$2b$10$tAjZ69EPEjR0jiQq3885OehITkaILgNK4pJK/RkL6L4MRDPeQN4.i', 'anthonytestcode@yahoo.com', 'student1', 'chan', 'student'),
    ('student2','$2b$10$tAjZ69EPEjR0jiQq3885OehITkaILgNK4pJK/RkL6L4MRDPeQN4.i', 'anthonytestcode@yahoo.com', 'student2', 'chan', 'student');
    
    CREATE TABLE students (
        username VARCHAR REFERENCES users(username) PRIMARY KEY,
        points INT DEFAULT 0
    );
    
    INSERT INTO students(username, points) VALUES
    ('student1', 0),
    ('student2', 0);
    
    CREATE TABLE teachers (
        username VARCHAR REFERENCES users(username) PRIMARY KEY,
        title VARCHAR
    );
    
    INSERT INTO teachers (username, title)VALUES
    ('teacher1', 'Ms.'),
    ('teacher2', 'Mr.');
    
    CREATE TABLE student_teacher (
        student_user VARCHAR REFERENCES students(username),
        teacher_user VARCHAR REFERENCES teachers(username)
    );
    
    INSERT INTO student_teacher(student_user, teacher_user) VALUES
    ('student1', 'teacher1'),
    ('student2', 'teacher2');
    
    CREATE TABLE assignments (
        assignment_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        student_user VARCHAR REFERENCES users(username),
        teacher_user VARCHAR REFERENCES users(username),
        range INT[],
        pattern VARCHAR[],
        is_random BOOLEAN NOT NULL,
        random_length INT,
        completed BOOLEAN DEFAULT FALSE,
        score INT DEFAULT 0,
        clef VARCHAR,
        key VARCHAR,
        rounds INT NOT NULL,
        date_assigned TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        date_completed TIMESTAMP,
        time_taken BIGINT
    );
    
    INSERT INTO assignments (student_user, teacher_user, range, is_random,pattern, completed, score, clef, key, rounds) VALUES
    ('student1', 'teacher1', ARRAY[48, 60], false, ARRAY['l2p1', 'l2p2','l2p3'], false, 0, 'treble', 'C', 10),
    ('student2', 'teacher2', ARRAY[60, 72], false, ARRAY['l2p1', 'l2p2','l2p3'], false, 0, 'treble', 'C', 10);
    
    CREATE TABLE tokens (
        token_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        token CHAR(36) NOT NULL,
        username VARCHAR NOT NULL REFERENCES users(username)
    );
    
    CREATE TABLE friends (
        friend_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        user1 VARCHAR REFERENCES users(username) NOT NULL,
        user2 VARCHAR REFERENCES users(username) NOT NULL
    );
    
    CREATE TABLE friend_requests (
        request_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        sender VARCHAR REFERENCES users(username) NOT NULL,
        recipient VARCHAR REFERENCES users(username) NOT NULL,
        time_sent TIMESTAMP
    );
    
    CREATE TABLE messages (
        message_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        sender VARCHAR REFERENCES users(username) NOT NULL,
        recipient VARCHAR REFERENCES users(username) NOT NULL,
        type VARCHAR NOT NULL,
        content VARCHAR NOT NULL,
        time_sent TIMESTAMP
    );
    
    CREATE TABLE notifications (
        notification_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        username VARCHAR REFERENCES users(username) NOT NULL,
        message VARCHAR,
        time_sent TIMESTAMP
    );`)

    console.log("Mock database environment created")
}


async function destroyDBEnv() {
    await db.query(`DROP TABLE IF EXISTS assignments, student_teacher, teachers, students, users, tokens, friends, friend_requests, messages, notifications;`);

    console.log("Mock database environment destroyed");
}

module.exports = {createDBEnv, destroyDBEnv};
