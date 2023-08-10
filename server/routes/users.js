const {Router} = require('express')
const authenticator = require('../middleware/authenticator')
const userController = require('../controllers/usersController')

const userRouter = Router();

userRouter.post('/register',userController.createUser)

userRouter.use(authenticator)

module.exports = userRouter
