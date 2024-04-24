const Order = require("./order");
const mongoose = require("mongoose");

const getTotalPrice = async function (orderID) {
  const priceObj = await Order.aggregate([
    // Match the specific order by ID
    { $match: { _id: mongoose.Types.ObjectId(orderID) } },
    // Lookup to join the FoodDrink collection
    {
      $lookup: {
        from: "fooddrinks", // This should be the name of the collection in the database
        localField: "orders", // Field in Order collection
        foreignField: "_id", // Field in FoodDrink collection
        as: "foodDetails", // Alias for the joined data
      },
    },
    // Unwind the array created by lookup
    { $unwind: "$foodDetails" },
    // Group and calculate the total price
    {
      $group: {
        _id: null, // Grouping at null means aggregate all, not grouping by any field
        totPrice: { $sum: "$foodDetails.price" }, // Assume `price` is a field in FoodDrink
      },
    },
  ]);
  const { totPrice } = priceObj;
  return totPrice;
};

module.exports = getTotalPrice;
