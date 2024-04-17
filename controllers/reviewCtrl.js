const Review = require("./../models/review");

const createReview = async (req, res) => {
  try {
    const reviewObj = { ...req.body };
    reviewObj.createdBy = reviewObj.user.userId;
    delete reviewObj.user;
    const newReview = new Review(reviewObj);
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(422).json({ message: error.message });
    }
    res.status(400).json({ message: error.message });
  }
};

const getReviewsOfFood = async (req, res) => {
  try {
    const foodDrinkID = req.params.id;
    const foodDrinkReviews = await Review.find({
      foodItem: foodDrinkID,
    })
      .populate("createdBy")
      .exec();
    res.status(200).json({ reviews: foodDrinkReviews });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getReviewsOfUser = async (req, res) => {
  try {
    const userID = req.params.id;
    const userReviews = await Review.find({
      createdBy: userID,
    })
      .populate("createdBy")
      .exec();
    res.status(200).json({ reviews: userReviews });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSingleReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      throw new Error("No review was able to be found.");
    } else {
      res.status(200).json({ review });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedReview) {
      throw new Error("No review was able to be found.");
    } else {
      res.status(200).json({ message: "Review updated successfully." });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      throw new Error("No review was able to be found.");
    } else {
      res.status(200).json({ message: "Review deleted successfully." });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createReview,
  getReviewsOfFood,
  getReviewsOfUser,
  getSingleReview,
  updateReview,
  deleteReview,
};
