const FoodDrink = require("./../models/food");


// Index route to get all food items
const getAllFoodDrink = async (req, res) => {
  try {
    // Retrieve all food items from the database
    const allFood = await FoodDrink.find();
    res.json(allFood); // Send JSON response with all food items
  } catch (error) {
    console.error("Error fetching all food items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Show route to get details of a single food item
const showFoodDrink = async (req, res) => {
  try {
    const foodId = req.params.id; // Extract food ID from request parameters
    // Find the food item by ID in the database
    const food = await FoodDrink.findById(foodId);
    if (!food) {
      // If food item is not found, return a 404 Not Found response
      return res.status(404).json({ error: "Food item not found" });
    }
    res.json(food); // Send JSON response with the food item details
  } catch (error) {
    console.error("Error fetching food item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllFoodDrink,
  showFoodDrink,
};
