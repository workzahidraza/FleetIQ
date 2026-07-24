const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const healthRouter = require("./routes/health.routes");
const authRouter = require("./routes/auth.route");

app.use(express.json());
app.use(cookieParser());

app.use("/check", healthRouter);
app.use("/api", authRouter);
module.exports = app;
