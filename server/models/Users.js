const db = require('../database/connect')
const Students = require('./Students')
const Teacher = require('./Teachers')

class Users {
    constructor({
        username, password, firstName, lastName, role
    }) {
        this.username = username
        this.password = password
        this.firstName = firstName
        this.lastName = lastName
        this.role = role
        this.title = title
    }

    static async getByUsername(username){
        const resp = await db.query('SELECT * FROM users WHERE username = $1',[username])
        if (resp.rows.length == 0){
            throw new Error('No user found.')
        } else {
            return new Users(resp.rows[0])
        }
    }

    static async createUser(data) {
        const {username,password,firstName,lastName,role,title} = data
        const resp = await db.query('INSERT INTO users (username,password,firstName,lastName,role) VALUES ($1,$2,$3,$4,$5) RETURNING *',[username,password,firstName,lastName,role])

        const user = await Users.getByUsername(resp.rows[0].username)
        if (role === 'student'){
            const student = await Students.createStudent(user.username)
            console.log(student)
        } else if (role === 'teacher'){
            const teacher = await Teacher.createStudent(user.username,title)
            console.log(teacher)
        }
        return user
        
    }
}

module.exports = Users
