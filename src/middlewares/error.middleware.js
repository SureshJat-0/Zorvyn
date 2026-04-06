import { errorResponse } from "../utils/apiResponse.js";

const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  const status = Number.isInteger(error?.status) ? error.status : 500;
  const message = error?.message || "Internal server error.";
  errorResponse(res, message, error, status);
};

const notFound = (req, res) => {
  return errorResponse(res, `Route not found: ${req.originalUrl}`, null, 404);
};

export { errorHandler, notFound };
