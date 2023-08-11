DROP TABLE IF EXISTS assignments, student_teacher, teachers, students, users, tokens, friends, friend_requests, messages, notifications;

CREATE TABLE users (
    username VARCHAR PRIMARY KEY,
    password VARCHAR NOT NULL,
    first_name VARCHAR,
    last_name VARCHAR,
    role VARCHAR,
    title VARCHAR
);

CREATE TABLE students (
    username VARCHAR REFERENCES users(username) PRIMARY KEY,
    points INT DEFAULT 0
);

CREATE TABLE teachers (
    username VARCHAR REFERENCES users(username) PRIMARY KEY,
    title VARCHAR
);

CREATE TABLE student_teacher (
    student_user VARCHAR REFERENCES students(username),
    teacher_user VARCHAR REFERENCES teachers(username)
);

CREATE TABLE assignments (
    assignment_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    student_user VARCHAR REFERENCES users(username),
    teacher_user VARCHAR REFERENCES users(username),
    range VARCHAR ARRAY,
    pattern INT ARRAY,
    completed BOOLEAN DEFAULT FALSE,
    score INT DEFAULT 0,
    clef VARCHAR,
    key VARCHAR,
    rounds INT NOT NULL,
    date_assigned TIMESTAMP,
    date_completed TIMESTAMP,
    time_taken BIGINT
);

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
);
