const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  //   console.log(token);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      //   console.log(token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //   console.log(decoded);
      req.user = await User.findById(decoded.id).select("-password");
      //   console.log(req.user);
      next();
    } catch (error) {
      console.log(error);
      res.status(400);
      throw new Error("Not Authorized ");
    }
  }
});

module.exports = { protect };
