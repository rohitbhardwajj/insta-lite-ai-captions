const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");



async function authMiddleware(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({ error: "Invalid User" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ _id: decode.id });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: err });
  }
}

module.exports =authMiddleware;