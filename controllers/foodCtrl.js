const Food = require("./../models/food");

//index for food (get all food)
const getAllFood = (req, res) => {
  res.send("all food");
};

const showFood = (req, res) => {
  res.send("show single food details");
};

module.exports = {
  getAllFood,
  showFood,
};
