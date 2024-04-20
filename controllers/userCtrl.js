const User = require("../models/user");

// Get a single user by ID
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
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

  // Ensure password cannot be updated via this route
  if (updates.password) {
    return res.status(400).json({ message: 'Password updates not allowed here.' });
  }

  try {
    const user = await User.findByIdAndUpdate(id, updates, { new: true, select: '-password' });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
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
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
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
    
    user.photo = req.file.path;
    await user.save();
    res.json({ message: "Profile photo updated successfully", photo: user.photo });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile photo", error: error.message });
  }
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  updateProfilePhoto,
};
