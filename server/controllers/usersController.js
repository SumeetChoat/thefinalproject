const Users = require('../models/Users')
const Assignments = require('../models/Assignments')
const StudentTeacher = require('../models/StudentTeacher')
const Students = require('../models/Students')
require('dotenv').config()
const bcrypt = require('bcrypt')

class UserController {
    static async createUser(req,res){
        try {
            const data = req.body
            const rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) 

            const salt = await bcrypt.genSalt(rounds)
            data["password"] = await bcrypt.hash(data["password"],salt)

            const user = await Users.createUser(data)
            res.status(201).send(user)
        } catch (err) {
            res.status(403).json({"error": err.message})
        }
    }
}

module.exports = UserController
