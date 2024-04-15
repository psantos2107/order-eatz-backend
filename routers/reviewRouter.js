const express = require("express");
const router = express.Router();
const reviewCtrl = require("./../controllers/reviewCtrl");
const authenticate = require("./../middleware/authenticate");

router.post("/", authenticate, reviewCtrl.createReview);

router.get("/food/:id", authenticate, reviewCtrl.getReviewsOfFood);

router.get("/user/:id", authenticate, reviewCtrl.getReviewsOfUser);

router.get("/:id", authenticate, reviewCtrl.getSingleReview);

router.patch("/:id", authenticate, reviewCtrl.updateReview);

router.delete("/:id", authenticate, reviewCtrl.deleteReview);

module.exports = router;

/* 
//CRUD ROUTES
app.use("/api/login", authRouter);
app.use("/api/food", foodRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/user", userRouter);
*/
