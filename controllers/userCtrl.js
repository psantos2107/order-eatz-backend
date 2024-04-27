const User = require("../models/user");

// Fetch a single user profile by ID
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

    // Ensure the photo path is relative for client-side use
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

// Update user profile details
const updateUserProfile = async (req, res) => {
  const userId = req.user.userId;
  let updates = req.body;

  // Handle file upload path
  if (req.file) {
    updates.photo = req.file.path;
  }

  // Convert foodInterests from JSON string to array if necessary
  if (req.body.foodInterests && typeof req.body.foodInterests === 'string') {
    try {
      updates.foodInterests = JSON.parse(req.body.foodInterests);
    } catch (e) {
      return res.status(400).json({ message: 'Invalid foodInterests format' });
    }
  }

  try {
    const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a user
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

// Update the profile photo for a user
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

    // Update photo path and save
    user.photo = `uploads/${req.file.filename}`;
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

