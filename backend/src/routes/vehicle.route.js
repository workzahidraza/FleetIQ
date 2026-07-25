const express = require("express");
const vehicleRouter = express.Router();
const vechileController = require("../controllers/vehicle.controller");
const authMiddleWare = require("../middlewares/auth.middleware");

vehicleRouter.post("/addVehicle", authMiddleWare, vechileController.addVehicle);

module.exports = vehicleRouter;
