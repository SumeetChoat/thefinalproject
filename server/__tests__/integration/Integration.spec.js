require("dotenv").config()
const request = require('supertest');
const ioClient = require('socket.io-client');

const {createDBEnv, destroyDBEnv} = require('../../database/setup-test-db');
const {server, api} = require('../../api');
// const db = require('../../database/connect')

const ioOptions = {
    transports: ['websocket'],
    forceNew: true,
    reconnection: false,
  };

describe("Testing Socket server", () => {
    let clientSocket1;
    // let clientSocket2;

    beforeAll(async () => {
        server.listen(process.env.TEST_PORT, () => {
            // console.log(`Test server running on port ${process.env.TEST_PORT}.`);
        });
        await createDBEnv();
        student1Socket = ioClient(`http://localhost:${process.env.TEST_PORT}`, ioOptions);        
        teacher1Socket = ioClient(`http://localhost:${process.env.TEST_PORT}`, ioOptions);        
        student2Socket = ioClient(`http://localhost:${process.env.TEST_PORT}`, ioOptions);        

    })

    afterAll(async () => {
        await destroyDBEnv();
        server.close(() => {
            // console.log("Test server closed.");
        })
        if (student1Socket.connected) {
            student1Socket.disconnect();
            student1Socket.off()
        }
        if (teacher1Socket.connected) {
            teacher1Socket.disconnect();
            teacher1Socket.off()
        }
        if (student2Socket.connected) {
            student2Socket.disconnect();
            student2Socket.off()
        }
    })

    // beforeEach(() => {
    //     clientSocket1 = ioClient(`http://localhost:${process.env.TEST_PORT}`, ioOptions);        
    //     // clientSocket2 = ioClient(`http://localhost:${process.env.TEST_PORT}`, ioOptions);        


    // })

    afterEach(() => {
        student1Socket.off()
        student2Socket.off()
        teacher1Socket.off()
    })

    test('data fetching has the correct properties for student', (done) => {
        student1Socket.on("username", data => {
            expect(data).toHaveProperty("friends");
            expect(data).toHaveProperty("friend_requests");
            expect(data).toHaveProperty("messages");
            expect(data).toHaveProperty("notifications");
            expect(data).toHaveProperty("assignments");
            done()
        })

        student1Socket.emit("username", {"username":"student1", "role":"student"});
    })

    test('data fetching has the correct properties for teacher', (done) => {
        teacher1Socket.on("username", data => {
            expect(data).toHaveProperty("friends");
            expect(data).toHaveProperty("friend_requests");
            expect(data).toHaveProperty("messages");
            expect(data).toHaveProperty("notifications");
            expect(data).toHaveProperty("assignments");
            done()
        })

        teacher1Socket.emit("username", {"username":"teacher1", "role":"teacher"});
    })

    test('Message sender recieves message', (done) => {
        student1Socket.on("message", msg => {
            expect(msg.recipient).toBe("student2");
            expect(msg.content).toBe("Hello student2");
            done()
        })

        student1Socket.emit("message", {"sender":"student1", "recipient":"student2", "type":"msg", "content":"Hello student2"});
    })

    test('Message recipient recieves message', (done) => {
        // This is a big work around until I can get two sockets working simultaneously in the test itself (works fine in production).
        student2Socket.on("message", msg => {
            expect(msg.recipient).toBe("student2");
            expect(msg.content).toBe("Hello student2");
            done()
        })

        student2Socket.emit("username", {"username":"student2", "role":"student"});
        student1Socket.emit("message", {"sender":"student1", "recipient":"student2", "type":"msg", "content":"Hello student2"});
    })

    test('Message recipient recieves notification', (done) => {
        student2Socket.on("notification", noti => {
            expect(noti).toHaveProperty("message");
            expect(noti.message).toBe("student1 has sent you a message.");
            done()
        })
        student1Socket.emit("message", {"sender":"student1", "recipient":"student2", "type":"msg", "content":"Hello student2"});
    })

    test('Friend request sender recieves the friend request', (done) => {
        student1Socket.on("friend_req", req => {
            expect(req).toHaveProperty("request_id")
            expect(req).toHaveProperty("sender")
            expect(req).toHaveProperty("recipient")
            expect(req).toHaveProperty("time_sent")
            expect(req.sender).toBe("student1")
            done()
        })
        student1Socket.emit("friend_req", {"sender":"student1", "recipient":"student2"});
    })

    test('Friend request recipient recieves the friend request', (done) => {
        student2Socket.on("friend_req", req => {
            expect(req).toHaveProperty("request_id")
            expect(req).toHaveProperty("sender")
            expect(req).toHaveProperty("recipient")
            expect(req).toHaveProperty("time_sent")
            expect(req.recipient).toBe("student2")
            done()
        })
        student1Socket.emit("friend_req", {"sender":"student1", "recipient":"student2"});
    })

    test('Friend request recipient recieves the friend request notification', (done) => {
        student1Socket.on("notification", noti => {
            expect(noti.message).toBe("student2 has sent you a friend request.")
            done()
        })
        student2Socket.emit("friend_req", {"sender":"student2", "recipient":"student1"});
    })
    let id;
    test('Accepted friend request adds friend to response recipient', (done) => {
        student1Socket.on("add_friend", friend => {
            id = friend.friend_id
            expect(friend).toHaveProperty("friend_id");
            done();
        })
        student1Socket.emit("friend_req_resp", {"sender":"student1", "recipient":"student2", "status":"accepted"});
    })

    test("Testing delete friend functionality", (done) => {
        student2Socket.on("delete_friend", new_id => {
            expect(new_id).toBe(id);
            done()
        })

        student1Socket.emit("delete_friend", id);
    })

    test('Accepted friend request adds friend to response sender', (done) => {
        student2Socket.on("add_friend", friend => {
            id = friend.friend_id
            expect(friend).toHaveProperty("friend_id");
            done();
        })
        student1Socket.emit("friend_req_resp", {"sender":"student1", "recipient":"student2", "status":"accepted"});
    })

    test("Testing delete friend functionality", (done) => {
        student2Socket.on("delete_friend", new_id => {
            expect(new_id).toBe(id);
            done()
        })

        student1Socket.emit("delete_friend", id);
    })

    test('Accepted friend request sends notfication to request recipient', (done) => {
        student2Socket.on("notification", noti => {
            expect(noti.message).toBe("student1 has accepted your friend request.")
            done()
        })

        student1Socket.emit("friend_req_resp", {"sender":"student2", "recipient":"student1", "status":"accepted"});
    })

    //At this point there are no pending friend requests, and only student1 & student2 are friends.
    
    test('student recieves assignment reminder notification', (done) => {
        student1Socket.on("notification", noti => {
            expect(noti.message).toBe("teacher1 is reminding you to complete an assignment.")
            expect(noti).toHaveProperty("message")
            done()
        })
        teacher1Socket.emit("reminder", {"sender":"teacher1", "recipient":"student1"});
    })

    test('student recieves a newly assigned assignment', (done) => {
        student1Socket.on("add_assignment", assignment => {
            expect(Object.keys(assignment)).toHaveLength(11);
            done()
        })

        teacher1Socket.emit("add_assignment", {
            assignment_id : 2,
            student_user : "student1",
            teacher_user : "teacher1",
            range : [48,60],
            pattern : ['l2p1', 'l2p2','l2p3'],
            is_random : false,
            completed : false,
            score : 0,
            clef : "treble", 
            key: 'C',
            rounds : 12
        })
    })

    test('student recieves notification after being set a new assignment', (done) => {
        student2Socket.on("notification", noti => {
            expect(noti).toHaveProperty("message")
            expect(noti.message).toBe('teacher1 has given you a new assignment.');
            done()
        })

        teacher1Socket.emit("add_assignment", {
            assignment_id : 2,
            student_user : "student2",
            teacher_user : "teacher1",
            range : [48,60],
            pattern : ['l2p1', 'l2p2','l2p3'],
            is_random : false,
            completed : false,
            score : 0,
            clef : "treble", 
            key: 'C',
            rounds : 12
        })
    })

    test("User recieves event telling them to delete all notifications", (done) => {
        student1Socket.on("delete_noti", (username) => {
            expect(username).toBeDefined();
            done()
        })
        student1Socket.emit("delete_noti", "student1");
    })



    
})

describe("Testing API", () => {
    let app;
    beforeAll(async () => {
        const test_port = process.env.TEST_PORT || 4000
        // app = api.listen(test_port, () => {
        //     console.log(`Test server running on port ${test_port}`);
        // });
        server.listen(test_port);
        await createDBEnv();
    })

    afterAll(async () => {
        await destroyDBEnv();
        server.close();
    })

    test('Test route', async() => {
        const res = await request(api).get('/');
        expect(res.statusCode).toBe(200)
    })

    test('Unsuccessful register route', async () =>{
        const res = await request(api).post('/users/register');
        expect(res.statusCode).toBe(403);
    })

    test('Successful student register route', async () =>{
        const data = {
            "username":'oliver',
            "password":"1",
            "first_name":"Oliver",
            "last_name":"thomas",
            "email":"o.thomas@gmail.com",
            "role":"student"
        }
        const res = await request(api).post('/users/register').send(data);

        expect(res.statusCode).toBe(201);
        expect(res.body.username).toBe('oliver');
    })

    test('Unsuccessful login route', async () => {
        const res = await request(api).post('/users/login').send({"username":"oliver", "password":"2"})
        expect(res.statusCode).toBe(403);
    })
    let token;
    test('Successful login route', async () => {
        const data = {
            "username":"oliver",
            "password":"1"
        }
        const res = await request(api).post('/users/login').send(data);
        token = res.body.token
        expect(res.statusCode).toBe(201);
        expect(res.body.authenticated).toBeTruthy();
    })

    test('Unsuccessful /users/:username', async () => {
        const res = await request(api).get('/users/olive').set({"token":token});
        expect(res.statusCode).toBe(404);
    })

    test('Successful /users/:username', async () => {
        const res = await request(api).get('/users/oliver').set({"token":token});
        expect(res.statusCode).toBe(200);
        expect(res.body.username).toBe('oliver');
    })

    // test('Unsuccessful /users/getUserByToken', async () => {
    //     const res = await request(api).get('/users/getUserByToken').set({"token":"null"});
    //     expect(res.statusCode).toBe(404);
    //     expect(res.body.err).toBe("No user found.")
    // })

    // test('Successful /users/getUserByToken', async () => {
    //     const res = await request(api).get('/users/getUserByToken').set({"token":token}).send({"token":token});
    //     console.log("Second one: ", res.body)
    //     expect(res.statusCode).toBe(200);
    // })

    // Add student routes here...

    test('Successful /students', async () => {
        const res = await request(api).get('/students').set({"token":token});
        expect(res.statusCode).toBe(200);
        res.body.forEach(student => expect(student.username).toBeDefined());
    })

    test('Successful /students/assignments/', async () => {
        //logout of Oliver
        const res1 = await request(api).delete('/users/logout').set({"token":token});

        //log in as student1
        const data = {
            "username":"student1",
            "password":"123"
        }
        const res2 = await request(api).post('/users/login').send(data);
        token = res2.body.token

        const res = await request(api).get('/students/assignments/').set({"token":token});
        expect(res.statusCode).toBe(200);
        res.body.forEach(assignment => expect(assignment.student_user).toBe("student1"));
    })

    test('Successful /students/assignment/', async () => {
        const res = await request(api).get('/students/assignment/').set({"token":token}).send({"assignment_id":1});
        expect(res.statusCode).toBe(200);
        expect(res.body.assignment_id).toBe(1);
    })

    test('Successful teacher register route', async () => {
        const data = {
            "username":'thomas',
            "password":"1",
            "first_name":"Thomas",
            "last_name":"Oliver",
            "email":"t.oliver@gmail.com",
            "role":"teacher"
        }
        const res = await request(api).post('/users/register').send(data);

        expect(res.statusCode).toBe(201);
        expect(res.body.username).toBe('thomas');
    })

    test('Successful /students/teacher', async () => {
        const res = await request(api).post('/students/teacher').set({"token":token}).send({"teacher_username":"thomas"});
        expect(res.statusCode).toBe(200);
        expect(res.body.student_user).toBe("student1");
        expect(res.body.teacher_user).toBe("thomas");
    })

    // test('Successful /students/delete', async () => {
    //     const res = await request(api).delete('/students/delete').set({"token":token});
    //     expect(res.statusCode).toBe(204);
    // })








    test('Unsuccessful logout', async () => {
        const res = await request(api).delete('/users/logout').set({"token":null});
        expect(res.statusCode).toBe(403);
    })

    test('Successful logout', async () => {
        const res = await request(api).delete('/users/logout').set({"token":token});
        expect(res.statusCode).toBe(202);
    })

    //Now a teacher is registered, so we need to login.

    let teacher_token;
    test('Successful teacher login route', async () => {
        const data = {
            "username":"teacher1",
            "password":"123"
        }
        const res = await request(api).post('/users/login').send(data);
        teacher_token = res.body.token
        expect(res.statusCode).toBe(201);
        expect(res.body.authenticated).toBeTruthy();
    })

    test("Successful /teachers/students", async () => {
        const res = await request(api).get('/teachers/students').set({"token":teacher_token});
        expect(res.statusCode).toBe(200);
        res.body.forEach(entry => expect(entry.username).toBeDefined());
    })

    test("Successful /teachers/assignment", async () => {
        const res = await request(api).get('/teachers/assignments').set({"token":teacher_token})
        expect(res.statusCode).toBe(200);
        res.body.forEach(assignment => expect(assignment.teacher_user).toBe('teacher1'));
    })

    test("Successful creation of assignment /teachers/assignment", async () => {
        data = {
            "student_user":"student1",
            "teacher_user":"thomas",
            "range":[48,60],
            "pattern":['l2p1', 'l2p2','l2p3'],
            "completed":false,
            "score":0,
            "clef":'treble',
            "key":'C',
            "rounds":24,
            "is_random": false,
            "random_length": null
        }
        const res = await request(api).post('/teachers/assignment').set({"token":teacher_token}).send(data);
        expect(res.statusCode).toBe(200);
    })



    test("successful deletion of assignment", async () => {
        const res = await request(api).delete('/teachers/assignment').set({"token":teacher_token}).send({"assignment_id":3});
        expect(res.statusCode).toBe(204);
        expect(res.request._data.assignment_id).toBe(3);
    })

    test("Successful deletion of student-teacher pair", async () => {
        const res = await request(api).delete('/teachers/student').set({"token":teacher_token}).send({"student_username":"student1"});
        expect(res.statusCode).toBe(204);
    })

    test("Successful deletion of teacher", async () => {
        const res = await request(api).delete('/teachers/delete').set({"token":teacher_token});
        expect(res.statusCode).toBe(204);
    })


})