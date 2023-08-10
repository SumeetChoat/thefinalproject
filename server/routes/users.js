const {Router} = require('express')
const authenticator = require('../middleware/authenticator')
const userController = require('../controllers/usersController')

const userRouter = Router();
userRouter.use(authenticator)

userRouter.post('/register',userController.register)

module.exports = userRouter
