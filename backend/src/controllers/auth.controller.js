const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const isUserExistes = await User.findOne({ email });
    if (isUserExistes) {
      return res.status(409).json({
        message: "user already registered",
      });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hash,
      role: role || "fleet_manager",
    });
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    res.cookie("token", token);
    res.status(201).json({
      message: "user registered successfully",
      Name: user.name,
      Email: user.email,
      Role: user.role,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const Login = async (req, res) => {
  // console.log(req.body);
  // console.log(req.headers);

  try {
    const { email, password } = req.body;
    const checkUserIsRegistered = await User.findOne({ email:email });
   
    if (!checkUserIsRegistered) {
      return res.status(404).json({
        message: "you have to register first",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      checkUserIsRegistered.password,
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "password is incorrect",
      });
    }
    const token = jwt.sign(
      { id: checkUserIsRegistered._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("token", token);

    res.status(200).json({
      message: "user is logged in successfully",
      user: {
        id: checkUserIsRegistered._id,
        name: checkUserIsRegistered.name,
        email: checkUserIsRegistered.email,
        role: checkUserIsRegistered.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const GetProfile = async (req, res) => {
  const allUserData = await User.find();
  res.status(200).json({
    message: "data of all registered users",
    user: req.user,
    data: { allUserData },
  });
};

module.exports = {
  Register,
  Login,
  GetProfile,
};
