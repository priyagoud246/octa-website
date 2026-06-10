const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'] 
  },
  password: { type: String, required: true, minlength: 6, select: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  institution: { type: String },
  phone: { type: String },
  lastLogin: { type: Date }
}, { timestamps: true });

// Virtual to easily check admin status
userSchema.virtual('isAdmin').get(function() {
  return this.role === 'admin';
});

// Hash password before save
userSchema.pre('save', async function (next) {
  // If the email changes, we could re-evaluate the role (optional safety)
  if (this.isModified('email')) {
    const APPROVED_ADMINS = ["priyagoud246@gmail.com", "partnerships@brivox.in"];
    this.role = APPROVED_ADMINS.includes(this.email) ? 'admin' : 'user';
  }

  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Check password method
userSchema.methods.comparePassword = async function (candidate) {
  return await bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', userSchema);