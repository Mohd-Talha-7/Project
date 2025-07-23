function isLoggedIn(req, res, next) {
  console.log("isLoggedIn middleware called.");
  console.log("req.session:", req.session);
  console.log("req.session.user:", req.session.user);
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized: Please log in." });
  }
}

module.exports = isLoggedIn;