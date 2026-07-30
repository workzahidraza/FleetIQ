const express = require("express");
const driverRouter = express.Router();
const driverController = require("../controllers/driver.controller");

driverRouter.post("/createDriver", driverController.createDriver);

module.exports = driverRouter;
