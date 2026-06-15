const express   = require('express');
const mongoose  = require('mongoose');
const cors      = require('cors');
const dotenv    = require('dotenv');
const rateLimit = require('express-rate-limit');
const path      = require('path');
const passport  = require('./config/passport');  // ← ADD
const jwt       = require('jsonwebtoken');        // ← ADD

dotenv.config();
const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'https://octa-website.netlify.app',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.use(express.json({ limit: '10kb' }));
app.use(passport.initialize());  // ← ADD THIS
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// ── GOOGLE AUTH ROUTES ── (ADD THESE)
app.get('/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/api/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: `${process.env.CLIENT_URL}/login?error=google_failed` }),
  (req, res) => {
    // Make JWT token for the user
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
    const user = {
      id:    req.user._id,
      name:  req.user.name,
      email: req.user.email,
      role:  req.user.role,
    };
    // Redirect to frontend with token in URL
    res.redirect(
      `${process.env.CLIENT_URL}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`
    );
  }
);

// ── EXISTING ROUTES ──
const authRoutes    = require('./routes/auth');
const enquiryRoutes = require('./routes/enquiry');
const coursesRoutes = require('./routes/courses');
const adminRoutes   = require('./routes/admin');

const routes = [
  { path: '/api/auth',    router: authRoutes    },
  { path: '/api/enquiry', router: enquiryRoutes },
  { path: '/api/courses', router: coursesRoutes },
  { path: '/api/admin',   router: adminRoutes   },
];

routes.forEach(r => {
  if (typeof r.router !== 'function') {
    console.error(`❌ Route file at ${r.path} did not export a valid router.`);
    process.exit(1);
  }
  app.use(r.path, r.router);
});

app.get('/api/health', (req, res) =>
  res.json({ success: true, message: 'OCTA API running ✅' })
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  );
}

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error',
  });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server → http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB error:', err.message);
    process.exit(1);
  });