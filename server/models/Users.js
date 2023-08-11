const db = require('../database/connect')
const Students = require('./Students')
const Teachers = require('./Teachers')

class Users {
    constructor({
        username, password, firstName, lastName, role
    }) {
        this.username = username
        this.password = password
        this.firstName = firstName
        this.lastName = lastName
        this.role = role
    }

    static async getByUsername(username){
        const resp = await db.query('SELECT * FROM users WHERE username = $1',[username])
        if (resp.rows.length == 0){
            throw new Error('No user found.')
        } else {
            return new Users(resp.rows[0])
        }
    }

    static async register(data) {
        const {username,password,firstName,lastName,role,title} = data
        const resp = await db.query('INSERT INTO users (username,password,firstName,lastName,role) VALUES ($1,$2,$3,$4,$5) RETURNING *',[username,password,firstName,lastName,role])
        if (resp.rows.length !== 0){
            const user = await Users.getByUsername(resp.rows[0].username)
            if (role === 'student'){
                await Students.createStudent(user.username)
            } else if (role === 'teacher'){
                await Teachers.createTeacher(user.username,title)
            }    
            return user
        } else {
            throw new Error('User with this username already exists.')
        }
    }
}

module.exports = Users
