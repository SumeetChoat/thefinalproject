DROP TABLE IF EXISTS assignments, student_teacher, teachers, students, users, tokens, friends, friend_requests, messages, notifications;

CREATE TABLE users (
    username VARCHAR PRIMARY KEY -- ON DELETE CASCADE, 
    password VARCHAR NOT NULL,
    firstName VARCHAR,
    lastName VARCHAR,
    role VARCHAR
);

CREATE TABLE students (
    username VARCHAR REFERENCES users(username) PRIMARY KEY,
    points INT DEFAULT 0
);

CREATE TABLE teachers (
    username VARCHAR PRIMARY KEY,
    title VARCHAR
);

CREATE TABLE student_teacher (
    student_user VARCHAR REFERENCES students(username),
    teacher_user VARCHAR REFERENCES teachers(username)
);

CREATE TABLE assignments (
    assignment_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    student_user VARCHAR REFERENCES students(username),
    teacher_user VARCHAR REFERENCES teachers(username),
    range INT ARRAY,
    pattern INT ARRAY,
    completed BOOLEAN DEFAULT FALSE,
    score INT DEFAULT 0,
    clef VARCHAR,
    rounds INT NOT NULL,
    date_assigned TIMESTAMP,
    date_completed TIMESTAMP 
);

CREATE TABLE tokens (
    token_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    token CHAR(36) NOT NULL,
    username VARCHAR NOT NULL
);

CREATE TABLE friends (
    friend_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user1 VARCHAR REFERENCES users(username) NOT NULL,
    user2 VARCHAR REFERENCES users(username) NOT NULL
);

CREATE TABLE friend_requests (
    request_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    sender VARCHAR REFERENCES users(username) NOT NULL,
    recipient VARCHAR REFERENCES users(username) NOT NULL
);

CREATE TABLE messages (
    message_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    sender VARCHAR REFERENCES users(username) NOT NULL,
    recipient VARCHAR REFERENCES users(username) NOT NULL,
    type VARCHAR NOT NULL,
    content VARCHAR NOT NULL
);

CREATE TABLE notifications (
    notification_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR REFERENCES users(username) NOT NULL,
    message VARCHAR
);
