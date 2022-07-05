const express = require("express");
const router = express.Router();
const { protect } = require("..//middlewer/authMiddleware");
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controller/usercontroller");

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/me", protect, getMe);

module.exports = router;
