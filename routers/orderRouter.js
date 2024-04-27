const express = require("express");
const router = express.Router();
const orderCtrl = require("./../controllers/orderCtrl");
const authenticate = require("./../middleware/authenticate");

//create an order
router.post("/", authenticate, orderCtrl.createOrder);

//get all the orders of a single user
//this is changed from before, which took a user ID
router.get("/user", authenticate, orderCtrl.getUserOrders);

//delete an order
router.delete("/:id", orderCtrl.deleteOrder);

//show an order
router.get("/:id", orderCtrl.showOrder);

//add item to orders array
router.patch("/:id/addItem", orderCtrl.updateOrderAddItem);

//delete item from orders array
router.patch("/:id/removeItem", orderCtrl.updateOrderDeleteItem);

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
