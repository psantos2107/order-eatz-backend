const Order = require("./../models/order");

const createOrder = async (req, res) => {
  try {
    const orderObj = { ...req.body };
    // orderObj.user = req.user.userId;
    orderObj.user = "661db0c3b89cd9ddc465476b"; //placeholder until auth is set up.
    const newOrder = new Order(orderObj);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userOrders = await Order.find({ user: req.params.id })
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
    const update = await Order.findByIdAndUpdate(
      req.params.id,
      { $push: { orders: req.body.orderId } },
      { new: true }
    );
    res.status(201).json(update);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateOrderDeleteItem = async (req, res) => {
  try {
    const update = await Order.findByIdAndUpdate(
      req.params.id,
      { $pull: { orders: req.body.orderId } },
      { new: true }
    );
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
