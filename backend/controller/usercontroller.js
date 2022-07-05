const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //   console.log(req.body);
  if (!name || !email || !password) {
    res.status(400);
    throw Error("Please Add Field");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw Error("User Already exists");
  }
  res.json({ message: "Register User " });
});

const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Login User " });
});
const getMe = asyncHandler(async (req, res) => {
  res.json({ message: "User Display " });
});

module.exports = { registerUser, loginUser, getMe };
