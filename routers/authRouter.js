const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/authCtrl");

// POST route for user registration
router.post("/register", authCtrl.register);

// POST route for logging in
router.post("/login", authCtrl.login);

module.exports = router;
