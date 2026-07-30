const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "on delivery", "on leave"],
      default: "available",
    },
    asssignedVehicleNumber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
    },
  },
  {
    timestamps: true,
  },
);

const Driver = mongoose.model("dirver", driverSchema);

module.exports = Driver;
