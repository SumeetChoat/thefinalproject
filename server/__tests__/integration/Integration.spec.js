require("dotenv").config()
const request = require('supertest');
const ioClient = require('socket.io-client');

const {createDBEnv, destroyDBEnv} = require('../../database/setup-test-db');
const {server, io} = require('../../api');
const socketController = require('../../socket/controller');

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

    test('Friend request recipient recieves the friend request', (done) => {
        student1Socket.on("notification", noti => {
            expect(noti.message).toBe("student2 has sent you a friend request.")
            done()
        })
        student2Socket.emit("friend_req", {"sender":"student2", "recipient":"student1"});
    })

    // test('Accepted friend request adds friend to request sender', (done) => {
    //     student2Socket.on("add_friend", friend => {
    //         expect(friend).toHaveProperty("friend_id");
    //         // expect(friend.user1).toBe("student2") || expect(friend.user1).toBe("student2");
    //         done();
    //     })
    // })



    
})