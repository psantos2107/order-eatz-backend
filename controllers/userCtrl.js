const User = require("../models/user");

// Get a single user by ID
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update user details
const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  delete updates.password; 

  try {
    const user = await User.findByIdAndUpdate(id, updates, { new: true, select: '-password' });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
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

// Update the profile photo
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

    // Assuming you want to store the path of the uploaded file
    user.photo = req.file.path;

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
  getUser,
  updateUser,
  deleteUser,
  updateProfilePhoto,
};

//NOTES:
/*
  (1) Make sure getUser and updateUser does not return the user's password
  (2) Make sure register returns a user object with the user's details like how the login part works (and not just userID)
*/
