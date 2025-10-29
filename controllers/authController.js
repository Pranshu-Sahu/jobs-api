const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/User");
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) res.json({ msg: "bad request" });

  const isUserAlreadyExists = await userModel.find({ username });

  if (isUserAlreadyExists) res.json("user already exists");

  const hashedPassord = bcrypt.hash(password, 10);
  // create user
  const user = await userModel.create({
    username,
    email,
    password: hashedPassord,
  });
  res.status.send({ message: "user registered successfully", user });
};

const loginUser = (req, res) => {
  // TODO: Implement user login logic
  res.send("Login user route");
};

module.exports = {
  registerUser,
  loginUser,
};
