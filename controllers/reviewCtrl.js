const Review = require("./../models/review");

const createReview = (req, res) => {
  console.log("create a review");
};

const getReviewsOfFood = (req, res) => {
  console.log("get all reviews of a single food");
};

const getReviewsOfUser = (req, res) => {
  console.log("get all reviews of a single user");
};

const getSingleReview = (req, res) => {
  console.log("get a single review");
};

const updateReview = (req, res) => {
  console.log("update a review");
};

const deleteReview = (req, res) => {
  console.log("delete a review");
};

module.exports = {
  createReview,
  getReviewsOfFood,
  getReviewsOfUser,
  getSingleReview,
  updateReview,
  deleteReview,
};
