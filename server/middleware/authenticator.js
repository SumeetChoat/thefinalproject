const Teacher = require('../models/Teachers')
const Students = require('../models/Students')

async function authenticator(req, res, next) {
    try {
        const userToken = req.headers["token"]
        const username = req.headers["username"]
        const userType = req.headers["role"]

        if (userToken == "null") {
            throw new Error("User not authenticated");
        } else if (userType === 'student') {
            const user = Students.getOneByUsername(username);
        } else {
            const user = Teacher.getOneByUsername(username)
        }

        if (user.token === userToken) {
            next()
        } else {
            throw new Error("User not authenticated");
        }
    } catch(err) {
        res.sendStatus(403)
        next()
    }
}

module.exports = authenticator;