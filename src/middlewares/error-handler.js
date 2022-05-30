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

  if (err.code && err.code === 11000) {
    CustomError.message = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    CustomError.statusCode = 400;
  }

  if (err.name === "CastError") {
    CustomError.message = `No item found with id : ${err.value}`;
    CustomError.statusCode = 404;
  }

  return res.status(CustomError.statusCode).json({
    message: CustomError.message,
  });
};

module.exports = ErrorHandler;
