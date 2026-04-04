const successResponse = (res, message, data = {}, status = 200) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

const errorResponse = (res, message, error = null, status = 500) => {
  return res.status(status).json({
    success: false,
    message,
    error,
  });
};

export { successResponse, errorResponse };
