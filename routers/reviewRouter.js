const express = require("express");
const router = express.Router();
const reviewCtrl = require("./../controllers/reviewCtrl");
const authenticate = require("./../middleware/authenticate");

// POST a review - should be private to ensure only authenticated users can post reviews
router.post("/", authenticate, reviewCtrl.createReview);

// GET reviews of a particular food - public
router.get("/food/:id", reviewCtrl.getReviewsOfFood);

// GET reviews by a user - public
router.get("/user/:id", reviewCtrl.getReviewsOfUser);

// GET a single review - public
router.get("/:id", reviewCtrl.getSingleReview);

// PATCH a review - should be private to ensure only the user who created it can update it
router.patch("/:id", authenticate, reviewCtrl.updateReview);

// DELETE a review - should be private to ensure only the user who created it can delete it
router.delete("/:id", authenticate, reviewCtrl.deleteReview);

//route to get all positive food reviews
router.get("/positive", reviewCtrl.getPositiveFoodReviews);

module.exports = router;
