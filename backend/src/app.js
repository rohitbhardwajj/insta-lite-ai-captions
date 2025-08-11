const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/posts.routes');

const app = express();

// CORS setup for local frontend
app.use(cors({
  origin: "https://insta-lite-ai-captions.vercel.app/",  
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get("/verify-token", (req, res) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: "No token" });

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    res.json({ message: "Valid token" });
  });
});

app.post("/api/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,  
    sameSite: "none"
  });
  res.status(200).json({ message: "Logged out successfully" });
});

app.use('/api/auth', authRoutes);
app.use('/api', postRoutes);

module.exports = app;
