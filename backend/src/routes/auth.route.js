const express = require("express");

const authRouter = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleWare = require("../middlewares/auth.middleware");

authRouter.post("/register", authController.Register);
authRouter.post("/login", authController.Login);
authRouter.get("/getprofile", authMiddleWare, authController.GetProfile);

module.exports = authRouter;
