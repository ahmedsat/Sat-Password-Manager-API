const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authenticate = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token || !token.startsWith("Bearer ")) {
    throw new UnauthenticatedError("token is not valid");
  }
  const tokenWithoutBearer = token.split("Bearer ")[1];
  try {
    const decoded = await jwt.verify(
      tokenWithoutBearer,
      process.env.JWT_SECRET
    );
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      throw new UnauthenticatedError("user not found");
    }
    req.user = user.toObject();
    req.user.tokenLifetime = decoded.exp - Date.now() / 1000;
    next();
  } catch (err) {
    logger.error(err);
    throw new UnauthenticatedError("token is not valid");
  }
};

module.exports = authenticate;
