const express = require("express");
const router = express.Router();
const reviewCtrl = require("./../controllers/reviewCtrl");
const authenticate = require("./../middleware/authenticate");

router.post("/", reviewCtrl.createReview);

router.get("/food/:id", reviewCtrl.getReviewsOfFood);

router.get("/user/:id", reviewCtrl.getReviewsOfUser);

router.get("/:id", reviewCtrl.getSingleReview);

router.patch("/:id", reviewCtrl.updateReview);

router.delete("/:id", reviewCtrl.deleteReview);

module.exports = router;

/* 
//CRUD ROUTES
app.use("/api/login", authRouter);
app.use("/api/food", foodRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/user", userRouter);
*/
