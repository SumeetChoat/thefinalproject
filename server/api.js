const express = require('express');
const cors = require('cors');
const http = require('http');
const {Server} = require("socket.io")

const api = express();
const server = http.createServer(api)
const io = new Server(server, {
    cors:{
        origin:"http://localhost:5173" //change to whatever the url is for frontend
    }
})

const teacherRouter = require('./routes/teachers')
const studentRouter = require('./routes/students');
const socketController = require('./socket/controller')

api.use(cors());
api.use(express.json());

api.get('/', (req,res) => {
    res.status(200).send("Our API")
})

api.use('/students', studentRouter)
api.use('/teacher', teacherRouter);

socketController(io);

module.exports = {server}; //will likely need to export some things for testing but unsure, hence the need for brackets.
