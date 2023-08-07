const fs = require('fs')
require('dotenv').config()

const db = require('./connect')
const sql = fs.readFileSync('./database/setup.sql').toString()


