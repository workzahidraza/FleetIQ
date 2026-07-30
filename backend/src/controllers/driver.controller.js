const Driver = require("../models/driver.model");

const createDriver = async (req, res) => {
  const checkIfDriverAlreadyAssigned = await Driver.findOne({
    status: {
      $in: ["on delivery", "on leave"],
    },
  });
};

module.exports = {
  createDriver,
};
