const successResponse = (res, message, data = {}, status = 200) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

const errorResponse = (res, message, err = null, status = 500) => {
  return res.status(status).json({
    success: false,
    message,
    err,
  });
};

export { successResponse, errorResponse };
