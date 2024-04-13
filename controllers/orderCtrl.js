const Order = require("./../models/order");

const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body)
    await newOrder.save()
    res.status(201).json(newOrder)
  }catch (err) {
    res.status(400).json({message: err.message})
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userOrders = await Order.find({ user: req.params.userId }).populate('orders').populate('user');
    res.status(201).json(userOrders);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id)
    res.status(201).json(deletedOrder)
  } catch (err) {
    res.status(400).json({message: err.message})
  }
};

const showOrder = async (req, res) => {
  try {
    const show = await Order.findById(req.params.id).populate('orders').populate('user')
    res.status(201).json(show)
  } catch (err) {
    res.status(400).json({message: err.message})
  }
};

const updateOrder = async (req, res) => {
  try {
    const update = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(201).json(update)
  } catch (err) {
    res.status(400).json({message: err.message})
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  deleteOrder,
  showOrder,
  updateOrder,
};
