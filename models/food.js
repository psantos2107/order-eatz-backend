const mongoose = require('mongoose');

const foodDrinkSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String 
  },
  category: {
    type: String,
    required: true
  },
  allergens: {
    type: [String],
    default: [] // If no allergens are specified
  },
  description: {
    type: String,
    required: true
  },
  recipe: {
    type: String 
  }
});

const FoodDrink = mongoose.model('FoodDrink', foodDrinkSchema);

module.exports = FoodDrink;
