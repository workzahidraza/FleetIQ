const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    vehicleType: {
      type: String,
      enum: ["open", "covered"],
      required: true,
    },
    vehicleCapacity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "not available"],
      default: "available",
    },
    assignedDriver: {
      ref: "Driver",
      type: mongoose.Schema.Types.ObjectId,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
