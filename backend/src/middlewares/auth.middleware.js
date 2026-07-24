const jwt = require("jsonwebtoken");

const authMiddleWare = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "please login first",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "invalid token",
    });
  }
};
module.exports = authMiddleWare;
