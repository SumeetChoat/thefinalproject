const Token = require('../models/Token')

async function authenticator(req, res, next) {
    try {
        const userToken = req.headers["token"]

        if (userToken == "null") {
            throw new Error("User not authenticated.");
        } else {
            req.tokenObj = await Token.getOneByToken(userToken)
            next()
        }
    } catch(err) {
        res.status(403).json({"error": err.message})
    }
}

module.exports = authenticator;
