const express = require("express");
const router = express.Router();
const { registerUser } = require("../controller/usercontroller");

router.post("/", registerUser);

module.exports = router;
