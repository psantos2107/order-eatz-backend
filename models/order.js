const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodDrink",
      required: true,
    },
  ],
  totalPrice: { type: Number, default: 0 },
  isSubmitted: { type: Boolean, default: false },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    //no longer made user required, in order to acct for guests checking out.
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
