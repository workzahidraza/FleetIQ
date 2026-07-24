const app = require("../app");

const GetHealth = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "FleetIQ API running",
  });
};

module.exports = { GetHealth };
