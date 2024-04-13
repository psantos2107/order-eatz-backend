const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authenticateUser = (req, res) => {
  console.log("logging in user");
};

module.exports = {
  authenticateUser,
};
