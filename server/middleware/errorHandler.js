const errorHandler = (err, req, res, next) => {
  let message = err.message || 'Server Error';
  let statusCode = err.statusCode || 500;

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors).map((e) => e.message).join(', ');
    statusCode = 400;
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists`;
    statusCode = 400;
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    message = 'Resource not found';
    statusCode = 404;
  }

  // Multer file size error
  if (err.code === 'LIMIT_FILE_SIZE') {
    message = 'File size cannot exceed 5MB';
    statusCode = 400;
  }

  res.status(statusCode).json({ success: false, message });
};

module.exports = errorHandler;
