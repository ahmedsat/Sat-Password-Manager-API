const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const ErrorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    res.status(err.statusCode).json({
      message: err.message,
    });
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
      error: err,
    });
  }
};

module.exports = ErrorHandler;
