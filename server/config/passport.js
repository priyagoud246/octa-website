const passport       = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User           = require('../models/User');

passport.use(new GoogleStrategy({
  clientID:     process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:  process.env.GOOGLE_CALLBACK_URL,
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists with this Google ID
    let user = await User.findOne({ googleId: profile.id });

    if (user) {
      // User exists — just return them
      return done(null, user);
    }

    // Check if email already registered normally
    const emailUser = await User.findOne({ email: profile.emails[0].value });
    if (emailUser) {
      // Link Google ID to existing account
      emailUser.googleId = profile.id;
      await emailUser.save();
      return done(null, emailUser);
    }

    // New user — create account
    user = await User.create({
      name:     profile.displayName,
      email:    profile.emails[0].value,
      googleId: profile.id,
      password: Math.random().toString(36).slice(-10) + 'Aa1!', // random password
      role:     'user',
    });

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;