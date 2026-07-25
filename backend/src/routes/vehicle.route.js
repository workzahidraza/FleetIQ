const express = require("express");
const vehicleRouter = express.Router();
const vehicleController = require("../controllers/vehicle.controller");
const authMiddleWare = require("../middlewares/auth.middleware");

vehicleRouter.post("/addVehicle", authMiddleWare, vehicleController.addVehicle);
vehicleRouter.get("/getvehicles", authMiddleWare, vehicleController.getAllVehicle);
vehicleRouter.get(
  "/getvehicle/:id",
  authMiddleWare,
  vehicleController.getSingleVehicle,
);
vehicleRouter.put(
  "/vehicles/:id",
  authMiddleWare,
  vehicleController.updateVehicle,
);
vehicleRouter.delete(
  "/vehicles/:id",
  authMiddleWare,
  vehicleController.deleteVehicle,
);

module.exports = vehicleRouter;
