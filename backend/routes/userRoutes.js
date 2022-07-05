const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  base,
} = require("../controller/usercontroller");
const { protect } = require("..//middlewer/authMiddleware");
router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.get("/data", base);

module.exports = router;
