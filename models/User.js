import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  mobile: { type: String, required: true },
  nationality: { type: String, required: true },
  language: { type: String, enum: ['AR', 'EN'], default: 'AR' },
  isDeleted: { type: Boolean, default: false },
  // [MODIFIED] Store user's last known location for notifications
 lastLat: {
  type: Number,
  default: null,
  validate: {
    validator: function (value) {
      return value === null || (value >= -90 && value <= 90);
    },
    message: props => `${props.value} is not a valid latitude! It must be between -90 and 90.`,
  },
},

lastLng: {
  type: Number,
  default: null,
  validate: {
    validator: function (value) {
      return value === null || (value >= -180 && value <= 180);
    },
    message: props => `${props.value} is not a valid longitude! It must be between -180 and 180.`,
  },
},
  image: { type: String, default: '' },

  role: {
    type: String,
    enum: ['traveler', 'guide'],
    default: 'traveler',
  },

  isVerified: { type: Boolean, default: false },
  verificationToken: String,
  verificationTokenExpires: Date,

  passwordResetToken: String,
  passwordResetTokenExpires: Date,
});

//Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;

