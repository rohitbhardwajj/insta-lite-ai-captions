const routes = require('express').Router();
const {signupController ,loginController} = require('./../controllers/auth.controller')
const authMiddleware = require('./../middlewares/auth.middleware')
// const jwt = require('jsonwebtoken');
// singup route

routes.post('/signup', signupController)

// login route

routes.post('/login' , loginController)



module.exports=routes;