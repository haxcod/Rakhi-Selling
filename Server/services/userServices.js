// services/userService.js
const User = require('../model/userModel');
const bcrypt = require('bcryptjs')

const createUser = async (data) => {
  try {
    const existingUser = await User.findOne({
      $or: [{ email: data.email }, { phone: data.phone }],
    });
    if (existingUser) {
      throw new Error('User already registered with this email or phone number');
    }
    const user = await User.create(data);
    return user;
  } catch (error) {
    throw error;
  }
};

const getUsers = async () => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return users;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }

    return user;
  } catch (error) {
    throw error;
  }
};



module.exports = {
  createUser,
  getUsers,
  loginUser,
};
