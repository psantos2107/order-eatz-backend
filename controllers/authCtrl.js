const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
const register = async (req, res) => {
  const { username, email, password, name, lastName, photo } = req.body;

  // Check if the user already exists based on username or email
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res.status(409).json({ message: "Username or Email already taken" });
  }

  // Create new user and save to database
  const newUser = new User({ username, email, password, name, lastName, photo });
  await newUser.save();

  // Generate JWT token for the new user
  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
  res.status(201).json({ userId: newUser._id, token });
};

// Log in a user
const login = async (req, res) => {
  const { username, password } = req.body;

  // Find user by username or email
  const user = await User.findOne({ $or: [{ username }, { email: username }] });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token for the logged-in user
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

  // Remove password from user data before sending to client
  const { password: _, ...userWithoutPassword } = user.toObject();
  res.json({ user: userWithoutPassword, token });
};

module.exports = {
  register,
  login
};
