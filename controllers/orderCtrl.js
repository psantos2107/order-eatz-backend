const Order = require("./../models/order");
const FoodDrink = require("./../models/food");
const getTotalPrice = require("./../models/getTotalOrderPrice");

const createOrder = async (req, res) => {
  try {
    const orderObj = { ...req.body };
    if (req.user) {
      orderObj.user = req.user.userId;
    }
    const newOrder = new Order(orderObj);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    //changed req.params.id into req.user.userId
    const userOrders = await Order.find({ user: req.user.userId })
      .populate("orders")
      .populate("user");
    res.status(201).json(userOrders);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    res.status(201).json(deletedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const showOrder = async (req, res) => {
  try {
    const show = await Order.findById(req.params.id)
      .populate("orders")
      .populate("user");
    res.status(201).json(show);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const update = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json(update);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//added specific functions to add items into the order array and to delete items from the order array
const updateOrderAddItem = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    const foodDrinkItem = await FoodDrink.findById(req.body.foodId);
    const newPrice = order.totalPrice + foodDrinkItem.price;
    const update = await Order.findByIdAndUpdate(
      req.params.id,
      { $push: { orders: req.body.foodId }, $set: { totalPrice: newPrice } },
      { new: true, runValidators: true }
    )
      .populate("orders")
      .populate("user");
    res.status(201).json(update);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateOrderDeleteItem = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    const foodDrinkItem = await FoodDrink.findById(req.body.foodId);
    const newPrice =
      order.totalPrice > 0 ? order.totalPrice - foodDrinkItem.price : 0;
    const update = await Order.findByIdAndUpdate(
      req.params.id,
      { $pull: { orders: req.body.foodId }, $set: { totalPrice: newPrice } },
      { new: true, runValidators: true }
    )
      .populate("orders")
      .populate("user");
    if (!update) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(update);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  deleteOrder,
  showOrder,
  updateOrder,
  updateOrderAddItem,
  updateOrderDeleteItem,
};
