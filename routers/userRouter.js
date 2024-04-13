const express = require("express");
const router = express.Router();
const userCtrl = require("./../controllers/userCtrl");

//post route
router.post("/", userCtrl.createUser);

//update route
router.patch("/:id", userCtrl.updateUser);

//show route
router.patch("/:id", userCtrl.showUser);

//delete route
router.patch("/:id", userCtrl.deleteUser);

module.exports = router;

/* 
//CRUD ROUTES
app.use("/api/login", authRouter);
app.use("/api/food", foodRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/user", userRouter);
*/