//third party modules
require("dotenv").config();
const express = require("express");
const path = require("path");
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
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

//CRUD ROUTES
app.use("/api/auth", authRouter);
app.use("/api/food", foodRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Listening for order-eatz on port ${port}`);
});
