require('dotenv').config()
const Users = require('../models/Users')
const bcrypt = require('bcrypt')
const Token = require('../models/Token')

class UserController {
    static async register(req,res){
        try {
            const data = req.body
            const rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) 

            const salt = await bcrypt.genSalt(rounds)
            data["password"] = await bcrypt.hash(data["password"],salt)

            const user = await Users.register(data)
            res.status(201).send(user)
        } catch (err) {
            res.status(403).json({"error": err.message})
        }
    }

    static async login(req,res){
        try {
            const data = req.body
            const user = await Users.getByUsername(data.username)
            const authenticated = bcrypt.compare(data["password"], user["password"])
            if (!authenticated){
                throw new Error('Wrong username or password')
            } else {
                const token = await Token.create(user["username"])
                res.status(201).json({
                    "authenticated": true,
                    "token": token.token
                })
            }
        } catch (err) {
            res.status(403).json({"error": err.message})
        }
    }
}

module.exports = UserController
