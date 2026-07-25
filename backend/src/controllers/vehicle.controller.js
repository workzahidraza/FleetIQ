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
const getAllVehicle = async (req, res) => {
  try {
    const allVehicle = await Vehicle.find();

    if (allVehicle.length === 0) {
      return res.status(404).json({
        message: "No vehicle found",
      });
    }

    res.status(200).json({
      message: "All vehicles fetched successfully",
      vehicles: allVehicle,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
const getSingleVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const foundVehicle = await Vehicle.findById(id);
    if (!foundVehicle) {
      return res.status(404).json({
        message: "vehicle not found",
      });
    }
    res.status(200).json({
      message: "single vehicle details",
      vehicle: foundVehicle,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedVehicle) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    res.status(200).json({
      message: "Vehicle updated successfully",
      vehicle: updatedVehicle,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const findAndDelete = await Vehicle.findByIdAndDelete(id);
    if (!findAndDelete) {
      return res.status(404).json({
        message: "vehicle not found",
      });
    }
    res.status(200).json({
      message: "user deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  addVehicle,
  getAllVehicle,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
