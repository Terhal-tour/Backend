import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../services/tokenService.js';
import { handleForgetPassword, handleResetPassword } from '../services/authService.js';
import crypto from "crypto";
import sendEmail from '../utils/sendEmail.js';
//  Register a new user
export const register = async (req, res) => {
  try {
    const { name, email, password, mobile, nationality, language ,role} = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already exists" });

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = new User({
      role,
      name,
      email,
      mobile,
      language,
      password,
      nationality,
      verificationToken,
      verificationTokenExpires: Date.now() + 1000 * 60 * 60 * 24,
    });

    await user.save();

    const verificationLink = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

    await sendEmail({
      to: email,
      subject: "Verify your email",
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for registering. Please verify your email by clicking the link below:</p>
        <a href="${verificationLink}">${verificationLink}</a>
        <p>This link will expire in 24 hours.</p>
      `,
    });

    res.status(201).json({ message: "Registration successful. Please check your email to verify.",user });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationMessages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: 'Validation error',
        errors: validationMessages
      });
    }

    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Verify Email Controller
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ error: "Invalid or expired verification token" });

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
     res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Login a user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, isDeleted: false });
    if (!user) return res.status(400).json({ message: "Invalid email, password, or account deactivated" });

    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your email first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken({ id: user._id, role: user.role });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        nationality: user.nationality,
        language: user.language,
        role:user.role,
        image: user.image
      }
    });
  } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });

  }
};


// Handle forget password
export const forgetPassword = async (req, res) => {
  try {
    const message = await handleForgetPassword(req.body.email);
    res.status(200).json({ message });
  } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });

  }
};
// Handle reset password
export const resetPassword = async (req, res) => {
  try {
    const { code, password } = req.body;

    const message = await handleResetPassword(code, password);
    res.status(200).json({ message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

