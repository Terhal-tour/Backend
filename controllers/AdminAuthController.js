import bcrypt from 'bcryptjs';
import { generateToken } from '../services/tokenService.js';
import Admin from '../models/Admin.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

  
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    console.log(`Admin ${admin.isSuper} logged in successfully`);

    const token = generateToken({ id: admin._id , role:"admin"});

    res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        isSuper: admin.isSuper
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};
