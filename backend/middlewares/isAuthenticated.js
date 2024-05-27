function isAuthenticated(req, res, next) {
  if (req.user || req.query) {
    return next();
  }
  res.status(401).json({
    success: false,
    message: "Unauthorized access",
  });
}

module.exports = isAuthenticated;
