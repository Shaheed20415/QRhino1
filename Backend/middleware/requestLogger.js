exports.requestLogger = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl} - ${req.ip}`);
  next();
};
