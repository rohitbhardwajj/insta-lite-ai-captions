const routes = require("express").Router();
const {userController} = require("../controllers/posts.controller")



routes.post("/post" , userController)



module.exports = routes;