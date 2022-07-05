const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please Add a name"],
    },
    name: {
      type: String,
      require: [true, "Please Add a email"],
      unique: true,
    },
    name: {
      type: String,
      require: [true, "Please Add a password"],
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("User", userSchema);
