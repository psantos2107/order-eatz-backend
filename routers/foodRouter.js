const express = require("express");
const router = express.Router();
const foodCtrl = require("./../controllers/foodCtrl");

//index route for all food
router.get("/", foodCtrl.getAllFoodDrink);

//show route for individual food
router.get("/:id", foodCtrl.showFoodDrink);

module.exports = router;
