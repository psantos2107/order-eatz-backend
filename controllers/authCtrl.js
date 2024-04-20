const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { username, email, password, name, lastName, photo } = req.body; // Include the email field
  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({ 
      $or: [{ username }, { email }]  // Check for both username and email
    });
    if (existingUser) {
      return res.status(409).json({ message: "Username or Email already taken" });
    }

    // Create the new user
    const newUser = new User({ username, email, password, name, lastName, photo }); // Include the email field
    await newUser.save();

    // Create the JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.status(201).json({ userId: newUser._id, token });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body; // 'username' could be an actual username or an email address
  try {
    // Try to find the user by username or email
    const user = await User.findOne({ 
      $or: [{ username }, { email: username }]
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Exclude the password when sending the user data back
    const userResponse = { ...user.toObject(), password: undefined };
    res.json({ user: userResponse, token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  register,
  login
};
