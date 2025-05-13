// controllers/userController.js
import * as userService from '../services/userService.js';

export const getProfile = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile', error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.user.id, req.body);
    res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (err) {
    res.status(400).json({ message: 'Error updating profile', error: err.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    await userService.softDeleteUser(req.user.id);
    res.json({ message: 'Account deactivated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deactivating account', error: err.message });
  }
};
