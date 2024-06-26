const User = require("../models/user");

// Get a single user profile
const getUserProfile = async (req, res) => {
  const userId = req.params.id || (req.user ? req.user.userId : null);

  if (!userId) {
    console.error("No user ID provided in the request");
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      console.error(`User not found with ID: ${userId}`);
      return res.status(404).json({ message: "User not found" });
    }

    // Adjust photo path to be relative
    const userResponse = user.toObject();
    if (userResponse.photo) {
      userResponse.photo = `uploads/${userResponse.photo.split('uploads/')[1]}`;
    }

    res.json(userResponse);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Example of updating user profile in your backend controller
const updateUserProfile = async (req, res) => {
  const userId = req.user.userId;

  let updates = req.body;
  if (req.file) {
    updates.photo = req.file.path;
  }
  if (req.body.foodInterests && typeof req.body.foodInterests === 'string') {
    try {
      req.body.foodInterests = JSON.parse(req.body.foodInterests);
    } catch (e) {
      return res.status(400).json({ message: 'Invalid foodInterests format' });
    }
  }

  try {
    const user = await User.findByIdAndUpdate(userId, updates, { new: true, select: '-password' });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateProfilePhoto = async (req, res) => {
  const { id } = req.params;

  if (!req.file) {
    return res.status(400).json({ message: "No photo uploaded" });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Use a more consistent way to handle path if necessary
    const relativePath = `uploads/${req.file.filename}`;
    user.photo = relativePath;

    await user.save();

    res.status(200).json({
      message: "Profile photo updated successfully",
      photo: user.photo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update profile photo",
      error: error.message,
    });
  }
};




module.exports = {
  getUserProfile,
  updateUserProfile,
  deleteUser,
  updateProfilePhoto,
};


//NOTES:
/*
  (1) Make sure getUser and updateUser does not return the user's password
  (2) Make sure register returns a user object with the user's details like how the login part works (and not just userID)
*/
