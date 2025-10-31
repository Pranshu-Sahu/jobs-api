const bcrypt = require("bcryptjs");
const UserModel = require("../models/User");
const generateToken = require("../utils/generateToken.js");
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.json({ msg: "bad request" });

    const isUserAlreadyExists = await UserModel.findOne({ username });

    if (isUserAlreadyExists)
      return res
        .status(409)
        .json({ message: "user with this username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    // create user
    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = generateToken({ id: user._id, email });
    res.cookie("token", token, { httpOnly: true, sameSite: "strict" });
    return res
      .status(201)
      .send({ message: "user registered successfully", user });
  } catch (error) {
    console.error();
    res.send("error while registring user");
  }
};

async function loginUser(req, res) {
  try {
    const { email, password } = req.body; // grab email and password from req.body
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await UserModel.findOne({ email }).select('+password'); // check if user with that email exists
    // if not, return 404
    if (!user) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    // if user exists, compare the password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    // if not match, return 401
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // if match, create a JWT token and send it to frontend in cookie
    const token = generateToken({ id: user._id, email: user.email });
    res.cookie("token", token, { httpOnly: true, sameSite: "strict" });

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("error logging in the user: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  registerUser,
  loginUser,
};
