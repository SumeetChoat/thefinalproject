const db = require('../database/connect')
const Students = require('./Students')
const Teachers = require('./Teachers')
const StudentTeacher = require('./StudentTeacher')

class Users {
    constructor({
        username, password, first_name, last_name, role
    }) {
        this.username = username
        this.password = password
        this.first_name = first_name
        this.last_name = last_name
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
        const {username,password,first_name,last_name,role,title} = data
        const resp = await db.query('INSERT INTO users (username,password,first_name,last_name,role) VALUES ($1,$2,$3,$4,$5) RETURNING *',[username,password,first_name,last_name,role])
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

    static async updateDetails(data) {
        const {first_name,last_name, teacher_user, title, username} = data
        const resp = await db.query('UPDATE users SET first_name = $1,last_name=$2 WHERE username = $3 RETURNING username',[first_name,last_name,username])
        const updatedUser = await Users.getByUsername(resp.rows[0].username)
        if (teacher_user){
            await StudentTeacher.assignTeacher(teacher_user,username)
        } else if (title) {
            const resp = await db.query('UPDATE teachers SET title = $1 WHERE username = $2 RETURNING *',[title,username])
            await Teachers.getOneByUsername(resp.rows[0].username)
        }
        return updatedUser
    }
}

module.exports = Users
