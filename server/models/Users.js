const db = require('../database/connect')

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

    static async createUser() {
        
    }
}

module.exports = Users
