const express   = require('express');
const mongoose  = require('mongoose');
const cors      = require('cors');
const dotenv    = require('dotenv');
const rateLimit = require('express-rate-limit');
const path      = require('path');

dotenv.config();
const app = express();

// ── CORS — allows localhost in dev, your Render frontend in production ──
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'https://octa-website.onrender.com',   // ← your Render frontend URL
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
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// ── ROUTES WITH VALIDATION ──
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

// ── SERVE REACT BUILD IN PRODUCTION ──
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  );
}

// ── GLOBAL ERROR HANDLER ──
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error',
  });
});

// ── CONNECT DB THEN START SERVER ──
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