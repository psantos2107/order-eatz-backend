const express = require("express");
const router = express.Router();
const authCtrl = require("./../controllers/authCtrl");

//POST ROUTE FOR LOGGING IN
router.post("/", authCtrl.authenticateUser);

module.exports = router;
