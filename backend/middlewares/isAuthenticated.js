function isAuthenticated(req, res, next) {
  if (req.user) {
    return next();
  }
  res.status(401).json({
    success: false,
    message: "Unauthorized access",
  });
}

module.exports = isAuthenticated;
