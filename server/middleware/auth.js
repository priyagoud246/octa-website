const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect — must be logged in
exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorised — please log in' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user) return res.status(401).json({ success: false, message: 'User not found' });
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Token invalid or expired' });
  }
};

// Admin only (Whitelisted Emails)
exports.adminOnly = (req, res, next) => {
  // Define your whitelist
  const APPROVED_ADMINS = ["priyagoud246@gmail.com", "partnerships@brivox.in"];
  
  // Check both role AND email whitelist
  if (req.user?.role === 'admin' && APPROVED_ADMINS.includes(req.user.email)) {
    return next();
  }
  
  return res.status(403).json({ success: false, message: 'Access denied: Administrative privileges required' });
};

module.exports = { protect: exports.protect, adminOnly: exports.adminOnly };