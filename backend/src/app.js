const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const healthRouter = require("./routes/health.routes");
const authRouter = require("./routes/auth.route");
const vehicleRouter = require("../src/routes/vehicle.route");
const driverRouter = require("./routes/driver.route");

app.use(express.json());
app.use(cookieParser());

app.use("/check", healthRouter);
app.use("/api", authRouter);
app.use("/api/vehicle", vehicleRouter);
app.use("/api/driver", driverRouter);
module.exports = app;
