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
    req.user = decoded;
    next();
  } catch (err) {
    logger.error(err);
    throw new UnauthenticatedError("token is not valid");
  }
};

module.exports = authenticate;
