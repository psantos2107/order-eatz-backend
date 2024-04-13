const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authenticateUser = (req, res) => {
  res.send("logging in user");
};

module.exports = {
  authenticateUser,
};
