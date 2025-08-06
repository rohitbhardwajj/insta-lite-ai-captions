const express = require('express');
const app = express();
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/posts.routes')
const cookieParser = require("cookie-parser")
const cors = require("cors");

app.use(cookieParser())


app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/' , postRoutes);

module.exports = app; 
