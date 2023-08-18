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

('anthony_chan','$2b$10$tAjZ69EPEjR0jiQq3885OehITkaILgNK4pJK/RkL6L4MRDPeQN4.i', 'anthonytestcode@yahoo.com', 'anthony', 'chan', 'teacher'),
('sumeet_choat','$2b$10$tAjZ69EPEjR0jiQq3885OehITkaILgNK4pJK/RkL6L4MRDPeQN4.i', 'anthonytestcode@yahoo.com', 'sumeet', 'choat', 'student'),
('oliver_thomas','$2b$10$tAjZ69EPEjR0jiQq3885OehITkaILgNK4pJK/RkL6L4MRDPeQN4.i', 'anthonytestcode@yahoo.com', 'oliver', 'thomas', 'student'),
('zeinab_roumieh','$2b$10$tAjZ69EPEjR0jiQq3885OehITkaILgNK4pJK/RkL6L4MRDPeQN4.i', 'anthonytestcode@yahoo.com', 'zeinab', 'roumieh', 'student'),
('santhi_addanki','$2b$10$tAjZ69EPEjR0jiQq3885OehITkaILgNK4pJK/RkL6L4MRDPeQN4.i', 'anthonytestcode@yahoo.com', 'santhi', 'addanki', 'student'),
('matilda_smith','$2b$10$tAjZ69EPEjR0jiQq3885OehITkaILgNK4pJK/RkL6L4MRDPeQN4.i', 'anthonytestcode@yahoo.com', 'matilda', 'smith', 'student');

CREATE TABLE students (
    username VARCHAR REFERENCES users(username) PRIMARY KEY,
    points INT DEFAULT 0
);

INSERT INTO students(username, points) VALUES
('sumeet_choat', 0),
('oliver_thomas', 0),
('santhi_addanki', 0),
('zeinab_roumieh', 0),
('matilda_smith', 0);

CREATE TABLE teachers (
    username VARCHAR REFERENCES users(username) PRIMARY KEY,
    title VARCHAR
);

INSERT INTO teachers (username, title)VALUES
('anthony_chan', 'Mr.');


CREATE TABLE student_teacher (
    student_user VARCHAR REFERENCES students(username),
    teacher_user VARCHAR REFERENCES teachers(username)
);

INSERT INTO student_teacher(student_user, teacher_user) VALUES
('sumeet_choat', 'anthony_chan'),
('oliver_thomas', 'anthony_chan'),
('zeinab_roumieh', 'anthony_chan'),
('santhi_addanki', 'anthony_chan'),
('matilda_smith', 'anthony_chan');


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
('matilda_smith', 'anthony_chan', ARRAY[48, 60], false, ARRAY['l2p1', 'l2p2','l2p3'], false, 0, 'bass', 'C', 2);


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

INSERT INTO friends (user1, user2) VALUES 
('matilda_smith', 'anthony_chan'),
('matilda_smith', 'sumeet_choat'),
('matilda_smith', 'oliver_thomas'),
('matilda_smith', 'zeinab_roumieh'),
('matilda_smith', 'santhi_addanki');
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
