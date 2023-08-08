const express = require('express');
const cors = require('cors');

const studentRouter = require('./routes/students');

const api = express();

api.use(cors());
api.use(express.json());

api.get('/', (req,res) => {
    res.status(200).send("Our API")
})

api.use('/students', studentRouter)

module.exports = api;
