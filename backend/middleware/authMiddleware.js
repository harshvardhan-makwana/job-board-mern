const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // 1. Header se token find
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // "Bearer eyJhbG..." से सिर्फ token वाला हिस्सा लेना
      token = req.headers.authorization.split(" ")[1];

      // 2. Token to verify
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. DB से यूजर ढूंढकर req में डाल दे, password हटाकर
      req.user = await User.findById(decoded.id).select("-password");

      next(); // सब सही है, आगे बढ़ो
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

module.exports = { protect, employer };
