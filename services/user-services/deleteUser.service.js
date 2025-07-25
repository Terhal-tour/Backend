// services/userService.js
import User from '../../models/User.js';
import bcrypt from 'bcryptjs';

export const softDeleteUser = async (userId, password, actingUserId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found.');
if(user.isDeleted==true){
  return false; 
}  
const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Incorrect password.');

  user.isDeleted = true;
  user.deletedAt = new Date();
  user.deletedBy = actingUserId;
  user.reactivatedAt = null;
  user.reactivatedBy = null;

  await user.save();
  return user;
};

export const reactivateUser = async (email, password) => {
  if (!email || !password) {
    throw new Error('Email and password are required.');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('User not found.');
  }

  if (!user.isDeleted) {
    throw new Error('Account is already active.');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials.');
  }

  // Reactivate
  user.isDeleted = false;
  await user.save();

  return user;
};

export const permanentlyDeleteUser = async (userId, password) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found.');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Incorrect password.');

  await User.findByIdAndDelete(userId);
  return;
};