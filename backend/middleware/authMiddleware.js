const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // 1. Header  token find
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // extract token from 'Bearer <token>' format
      token = req.headers.authorization.split(" ")[1];

      // 2. verify jwt token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. attach user to request object, exclude password
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
const employer = (req, res, next) => {
  if (req.user && req.user.role === "employer") {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as an employer" });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access only" });
  }
};

module.exports = { protect, employer, adminOnly };
