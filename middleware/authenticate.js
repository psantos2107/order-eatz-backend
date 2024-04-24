const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const guestOrder = req.headers.guestorder || null;
  //added the below to see if the request is for a guestOrder
  if (guestOrder === "true") {
    return next();
  } else {
    if (!authHeader) {
      return res
        .status(403)
        .json({ message: "Authorization header is missing" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      console.log("No token found in the authorization header:", authHeader);
      return res
        .status(403)
        .json({ message: "A token is required for authentication" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      console.error("Token verification failed:", err);
      return res
        .status(401)
        .json({ message: "Invalid Token", error: err.message });
    }
  }
};

module.exports = authenticate;
