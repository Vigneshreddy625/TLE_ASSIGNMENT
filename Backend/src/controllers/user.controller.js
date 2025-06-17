import User from '../models/user.model.js';
import { syncUserData } from '../services/codeforceServices.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-__v');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    
    await syncUserData(savedUser._id);
    res.status(201).json(savedUser);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email or Codeforces handle already exists' });
    }
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const oldUser = await User.findById(req.params.id);
    if (!oldUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    // If Codeforces handle was updated, sync data immediately
    if (oldUser.codeforcesHandle !== updatedUser.codeforcesHandle) {
      await syncUserData(updatedUser._id);
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleAutoEmail = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.autoEmailEnabled = !user.autoEmailEnabled;
    await user.save();

    res.json({ message: `Auto email ${user.autoEmailEnabled ? 'enabled' : 'disabled'}`, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};