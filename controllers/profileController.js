import {getUserProfile, updateUserProfile} from '../services/profileService.js';
//get user profile by ID
export const getUser=async (req, res) =>{
      try {
    const user = await getUserProfile(req.user.id);
    res.status(200).json({ user });
  } catch (err) {
res.status(500).json({ message: 'Internal Server Error', error: err.message });  }
}
// Update user profile
export const updateUser = async (req, res) => {
 try {
    const imagePath = req.file
      ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
      : null;

    const updatedUser = await updateUserProfile(req.user.id, req.body, imagePath);
    res.status(200).json({ message: 'Profile updated', user: updatedUser });
  } catch (err) {
res.status(500).json({ message: 'Internal Server Error', error: err.message });  }
}
  