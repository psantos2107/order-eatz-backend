const express = require("express");
const router = express.Router();
const orderCtrl = require("./../controllers/orderCtrl");

//create an order
router.post("/", orderCtrl.createOrder);

//get all the orders of a single user
router.get("/user/:id", orderCtrl.getUserOrders);

//delete an order
router.delete("/:id", orderCtrl.deleteOrder);

//show an order
router.get("/:id", orderCtrl.showOrder);

//update an order
router.patch("/:id", orderCtrl.updateOrder);

module.exports = router;

/* 
//CRUD ROUTES
app.use("/api/login", authRouter);
app.use("/api/food", foodRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/user", userRouter);
*/
