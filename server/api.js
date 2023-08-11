const express = require('express');
const cors = require('cors');
const teacherRouter = require('./routes/teachers')
const studentRouter = require('./routes/students');
const logRoutes = require('./middleware/logger')
const userRouter = require('./routes/users')

const api = express();

api.use(logRoutes);
api.use(cors());
api.use(express.json());

api.get('/', (req,res) => {
    res.status(200).send("Our API")
})

api.use('/users', userRouter)
api.use('/students', studentRouter)
api.use('/teachers', teacherRouter);

module.exports = api;
