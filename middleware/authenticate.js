const jwt = require("jsonwebtoken");

// Middleware to authenticate requests based on JWT tokens
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const guestOrder = req.headers.guestorder || null;

  // Allow guest orders to proceed without authentication
  if (guestOrder === "true") {
    return next();
  }

  // Check if authorization header is present
  if (!authHeader) {
    return res.status(403).json({ message: "Authorization header is missing" });
  }

  // Extract token from authorization header
  const token = authHeader.split(" ")[1];
  if (!token) {
    console.log("No token found in the authorization header:", authHeader);
    return res.status(403).json({ message: "A token is required for authentication" });
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded token to request
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).json({ message: "Invalid Token", error: err.message });
  }
};

module.exports = authenticate;
