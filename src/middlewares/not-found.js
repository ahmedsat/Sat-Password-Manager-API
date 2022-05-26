const { NotFoundError } = require("../errors");
const NotFoundHandler = (req, res) => {
  throw new NotFoundError("Route not found");
};

module.exports = NotFoundHandler;
