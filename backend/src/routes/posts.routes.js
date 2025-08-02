const routes = require("express").Router();
const authMiddleware = require("./../middlewares/auth.middleware")
const createPostController = require("../controllers/createpost.controller")
const multer = require("multer");
const getPosts = require("../controllers/getpost.controller")


const upload = multer({storage:multer.memoryStorage()})

routes.post("/post", authMiddleware , upload.single("image"), createPostController);

routes.get("/post" , authMiddleware , getPosts)

module.exports = routes;
