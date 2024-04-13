const User = require("./../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = (req, res) => {
  res.send("create a user");
};

const updateUser = (req, res) => {
  res.send("update a user");
};

const showUser = (req, res) => {
  res.send("show a user");
};

const deleteUser = (req, res) => {
  res.send("delete a user");
};

module.exports = {
  createUser,
  updateUser,
  showUser,
  deleteUser,
};
