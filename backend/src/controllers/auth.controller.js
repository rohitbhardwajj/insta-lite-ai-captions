const jwt = require("jsonwebtoken");
const userModel = require("./../models/user.model");
const bcrypt = require("bcryptjs")

async function signupController(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    const isUserAlreadyExist = await userModel.findOne({ username });

    if (isUserAlreadyExist) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({ username, password: hashedPassword });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: true, 
  maxAge: 24 * 60 * 60 * 1000,
});


    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function loginController(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: "Username and password are required",
    });
  }

  try {
    const userData = await userModel.findOne({ username });

    if (!userData) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    
    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET);
       res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: true, 
  maxAge: 24 * 60 * 60 * 1000,
});

    return res.status(200).json({ message: "User login successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}



module.exports = {
  signupController,
  loginController,
};
