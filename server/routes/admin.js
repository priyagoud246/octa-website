const router = require('express').Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');
const Enquiry = require('../models/Enquiry');
const Course = require('../models/Course');

// 1. Define the VIP list
const APPROVED_ADMINS = ["priyagoud246@gmail.com", "partnerships@brivox.in"];

// 2. Middleware to enforce the whitelist
const whitelistOnly = (req, res, next) => {
  if (req.user && APPROVED_ADMINS.includes(req.user.email)) {
    next();
  } else {
    res.status(403).json({ success: false, message: "Access Denied: You are not authorized." });
  }
};

// 3. Apply protection to all routes below
router.use(protect, whitelistOnly);

// GET /api/admin/dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const [totalEnquiries, newEnquiries, totalUsers, totalCourses, recentEnquiries, byStatus] =
      await Promise.all([
        Enquiry.countDocuments(),
        Enquiry.countDocuments({ status: 'new' }),
        User.countDocuments(),
        Course.countDocuments({ isActive: true }),
        Enquiry.find().sort('-createdAt').limit(5),
        Enquiry.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }])
      ]);
    res.json({ success: true, stats: { totalEnquiries, newEnquiries, totalUsers, totalCourses }, byStatus, recentEnquiries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// IMPORTANT: After you have created your 2-3 admin accounts, DELETE this block!
router.post('/create-admin', async (req, res) => {
  try {
    // SECURITY WARNING: Hardcoded check instead of relying on JWT_SECRET
    const { secretKey, name, email, password } = req.body;
    
    // Use a unique environment variable for this specific task
    if (secretKey !== process.env.ADMIN_SETUP_KEY)
      return res.status(403).json({ success: false, message: 'Invalid setup key' });
      
    if (await User.findOne({ email }))
      return res.status(400).json({ success: false, message: 'User exists already' });
      
    const admin = await User.create({ name, email, password, role: 'admin' });
    res.status(201).json({ success: true, message: 'Admin created', id: admin._id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;