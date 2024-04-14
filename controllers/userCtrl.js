const User = require("../models/user");


const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
      return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(user);
};


const updateUser = async (req, res) => {
  const updates = req.body;
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  Object.keys(updates).forEach(key => user[key] = updates[key]);
  await user.save();
  res.status(200).json(user);
};

const showUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  res.status(200).json({ message: 'User deleted successfully' });
};

module.exports = {
  getUser,
  updateUser,
  showUser,
  deleteUser,
};
