const {Router} = require('express')
const authenticator = require('../middleware/authenticator')
const usersController = require('../controllers/usersController')

const userRouter = Router();

userRouter.post('/register',usersController.register)
userRouter.post('/login', usersController.login)

userRouter.use(authenticator)

module.exports = userRouter
