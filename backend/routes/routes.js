const express = require("express");
const {
  base,
  setbase,
  putbase,
  deletebase,
} = require("../controller/controller");
const router = express.Router();
const { protect } = require("..//middlewer/authMiddleware");

router.route("/").get(protect, base).post(protect, setbase);
router.route("/:id").put(protect, putbase).delete(protect, deletebase);

// router.get("/", control);

module.exports = router;
