const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const base = asyncHandler(async (req, res) => {
  const resGoals = await User.find();
  res.status(200).json(resGoals);
});
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

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(200).json({
      message: "success",
      data: {
        __id: user["id"],
        name: user["name"],
        email: user["email"],
        token: generateToken(user["id"]),
      },
    });
  } else {
    res.status(400);
    throw Error("Invalid user data");
  }

  //   res.json({ message: "Register User " });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const resGoals = await User.find();

  //akses login admin
  if (
    user["email"] == process.env.ADMIN_EMAIL &&
    (await bcrypt.compare(password, user.password))
  ) {
    // res.status(200).json(resGoals);
    res.json({
      message: "success",
      token: generateToken(user["_id"]),
      data: {
        status: "Login Admin",
        user: resGoals,
      },
      //   data: {
      //     __id: user["id"],
      //     name: user["name"],
      //     email: user["email"],
      //     token: generateToken(user["_id"]),
      //   },
    });
  } else {
    //login user
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        message: "success",
        data: {
          __id: user["id"],
          name: user["name"],
          email: user["email"],
          token: generateToken(user["id"]),
        },
      });
    } else {
      res.status(400);
      throw Error("Invalid credentials");
    }
  }
  //   } else {
  //     res.status(400);
  //     throw Error("Invalid credentials");
  //   }
  //   res.json({ message: "Login User " });
});
const getMe = asyncHandler(async (req, res) => {
  const { id, name, email } = await User.findById(req.user.id);
  //   console.log({ _id, name, email });
  res.status(200).json({
    message: "Success",
    data: {
      id: id,
      name,
      email,
    },
  });
  //   res.json({ message: "User Display " });
});

//not solved
const deleteuser = asyncHandler(async (req, res) => {
  const { id, name, email } = await User.findById(req.user.id);

  console.log(id);
  if (!id) {
    res.status(400);
    throw new Error("Id Not Found !!");
  }
  await goal.remove();
  const result = {
    status: "OK",
    message: "Successfully Delete",
    id: req.params.id,
  };
  res.status(200).json(result);
  //   res.json({ message: "User Display " });
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, loginUser, getMe, base, deleteuser };
