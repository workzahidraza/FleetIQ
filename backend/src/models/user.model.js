const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "fleet_manager", "driver"],
      default: "fleet_manager",
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("users", userSchema);

module.exports = User;
