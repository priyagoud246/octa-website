const router = require('express').Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

// ── Google OAuth ──────────────────────────────────────────
// Step 1: Redirect user to Google
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Step 2: Google redirects back here with code
router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: `${process.env.CLIENT_URL}/login?error=oauth_failed` }),
  (req, res) => {
    // Sign a JWT just like your normal login
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const user = encodeURIComponent(JSON.stringify({
      _id:   req.user._id,
      name:  req.user.name,
      email: req.user.email,
      role:  req.user.role,
    }));

    // Send token to your React frontend
    res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}&user=${user}`);
  }
);

module.exports = router;