const Order = require("./../models/order");

const createOrder = (req, res) => {
  res.send("create an order");
};

const getUserOrders = (req, res) => {
  res.send("get orders of a single user");
};

const deleteOrder = (req, res) => {
  res.send("delete an order");
};

const showOrder = (req, res) => {
  res.send("show an order");
};

const updateOrder = (req, res) => {
  res.send("update order");
};

module.exports = {
  createOrder,
  getUserOrders,
  deleteOrder,
  showOrder,
  updateOrder,
};
