//third party modules
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

//our own modules
const db = require("./models");
const authRouter = require("./routers/authRouter");
const foodRouter = require("./routers/foodRouter");
const orderRouter = require("./routers/orderRouter");
const reviewRouter = require("./routers/reviewRouter");
const userRouter = require("./routers/userRouter");

//middleware
app.use(express.json());
app.use(cors());

//CRUD ROUTES
app.use("/api/login", authRouter);
app.use("/api/food", foodRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Listening for order-eatz on port ${port}`);
});
