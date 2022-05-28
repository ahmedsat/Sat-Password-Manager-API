const errorHandler = require("./error-handler");
const notFoundHandler = require("./not-found");
const auth = require("./authentication");

module.exports = {
  errorHandler,
  notFoundHandler,
  auth,
};
