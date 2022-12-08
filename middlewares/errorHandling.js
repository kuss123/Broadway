export const errorhandler = (error, req, res, next) => {
  res.status(error.status || 500).json({
    status: error.status || 500,
    message: error.message,
  });
};

export const errorHandler = (status, message) => {

  res.status(status).json(message);
};
