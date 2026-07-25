const Vehicle = require("../models/vehicle.model");

const addVehicle = async (req, res) => {
  try {
    const {
      vehicleNumber,
      vehicleType,
      vehicleCapacity,
      status,
      assignedDriver,
    } = req.body;
    const formattedVehicleNumber = vehicleNumber.trim().toUpperCase();
    const existingVehicle = await Vehicle.findOne({
      vehicleNumber: formattedVehicleNumber,
    });

    if (existingVehicle) {
      return res.status(409).json({
        message: "vehicle already exists",
      });
    }
    const createVehicle = await Vehicle.create({
      vehicleNumber: formattedVehicleNumber,
      vehicleType,
      vehicleCapacity,
      status,
      assignedDriver: assignedDriver || null,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "vehicle added successfully",
      vehicle: createVehicle,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addVehicle,
};
