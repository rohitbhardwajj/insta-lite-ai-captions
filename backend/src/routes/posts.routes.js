const routes = require("express").Router();
const authMiddleware = require("./../middlewares/auth.middleware")
const createPostController = require("../controllers/createpost.controller")
routes.post("/post", authMiddleware , createPostController);

module.exports = routes;
