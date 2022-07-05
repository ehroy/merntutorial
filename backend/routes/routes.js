const express = require("express");
const {
  base,
  setbase,
  putbase,
  deletebase,
} = require("../controller/controller");
const router = express.Router();

router.route("/").get(base).post(setbase);
router.route("/:id").put(putbase).delete(deletebase);

// router.get("/", control);

module.exports = router;
