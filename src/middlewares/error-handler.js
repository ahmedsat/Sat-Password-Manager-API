const { StatusCodes } = require("http-status-codes");

const ErrorHandler = (err, req, res, next) => {
  let CustomError = {
    message: err.message || "Internal server error",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (err.name === "ValidationError") {
    CustomError = {
      message: Object.values(err.errors)
        .map((error) => error.message)
        .join(", "),
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  //   message: err,
  //   error: err,
  // });

  return res.status(CustomError.statusCode).json({
    message: CustomError.message,
  });
};

module.exports = ErrorHandler;
