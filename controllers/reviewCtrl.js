const Review = require("./../models/review");

const createReview = (req, res) => {
  res.send("create a review");
};

const getReviewsOfFood = (req, res) => {
  res.send("get all reviews of a single food");
};

const getReviewsOfUser = (req, res) => {
  res.send("get all reviews of a single user");
};

const getSingleReview = (req, res) => {
  res.send("get a single review");
};

const updateReview = (req, res) => {
  res.send("update a review");
};

const deleteReview = (req, res) => {
  res.send("delete a review");
};

module.exports = {
  createReview,
  getReviewsOfFood,
  getReviewsOfUser,
  getSingleReview,
  updateReview,
  deleteReview,
};
