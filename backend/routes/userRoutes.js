const express = require("express");
const router = express.Router();
const { register } = require("../controller/userController");

router.post("/", register);

module.exports = router;
