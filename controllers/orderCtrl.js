const Order = require("./../models/order");

const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/*
NOTE: we want totalPrice to be programmatically calculated. It is not something that a user can hard set in the beginning, but rather a function of all the order prices added together. Thus, I think createOrder and updateOrder needs to be tweaked a little bit to ensure that happens.

Have you ever used the aggregate() tool in MongoDB? This is one way we can make it so that totalPrice can be programmatically calculated.  
 */

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

/* 
NOTES: UPDATING AN ORDER: whenever we update an order, all that we’re doing is updating the orders array, either by adding or deleting an item inside of the orders array, which will be handled individually with an "add" or "delete" button. Maybe we can consider breaking up the update function into two separate functions? One where we update an order by adding an item or update an order by deleting an item?
*/

module.exports = {
  createOrder,
  getUserOrders,
  deleteOrder,
  showOrder,
  updateOrder,
};
