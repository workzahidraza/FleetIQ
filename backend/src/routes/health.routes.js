const express = require("express");
const healthRouter = express.Router();
const healthController = require("../controllers/health.controller");

healthRouter.get("/health", healthController.GetHealth);

module.exports = healthRouter;
