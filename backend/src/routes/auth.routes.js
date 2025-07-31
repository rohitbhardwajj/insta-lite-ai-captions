const routes = require('express').Router();
const {signupController ,loginController} = require('./../controllers/auth.controller')


// singup route

routes.post('/signup', signupController)

// login route

routes.post('/login' , loginController)

module.exports=routes;