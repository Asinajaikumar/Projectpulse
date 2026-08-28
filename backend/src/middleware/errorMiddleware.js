export const errorMiddleware = (err, req, res, next) => {
  console.error('API Execution Error:', err.stack || err.message || err);

  const statusCode = err.statusCode || (res.statusCode !== 200 ? res.statusCode : 500);

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error encountered while processing request.',
  });
};

export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Resource endpoint not found: ${req.method} ${req.originalUrl}`
  });
};

export default errorMiddleware;
