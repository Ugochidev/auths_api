const { CelebrateError } = require("celebrate");
const { JsonWebTokenError } = require("jsonwebtoken");
const { MulterError } = require("multer");

const AppError = require("./appError");

module.exports = function errorHandler(error, request, response, _) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  if (error instanceof CelebrateError) {
    const bodyMessage = error.details.get("body")?.message;
    const queryMessage = error.details.get("query")?.message;
    const paramsMessage = error.details.get("params")?.message;

    const message = bodyMessage || queryMessage || paramsMessage;
    console.log(`${message}`);

    return response.status(400).json({
      success: false,
      message,
    });
  }

  if (error instanceof MulterError) {
    return response.status(400).json({
      success: false,
      message: `${error.message} '${error.field}'`,
    });
  }

  if (error instanceof JsonWebTokenError) {
    return response.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }

  console.error(error.stack);

  return response.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
