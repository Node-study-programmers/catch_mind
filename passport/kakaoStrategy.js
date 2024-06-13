const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config(); // 환경 변수 로드

passport.use(new KakaoStrategy({
  clientID: process.env.KAKAO_CLIENT_ID,
  clientSecret: process.env.KAKAO_CLIENT_SECRET,
  callbackURL: 'http://localhost:9999/auth/kakao/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ nickname: profile.displayName });
        if (!user) {
            user = new User({
                nickname: profile.displayName,
                KakaoLogin: true
            });
            await user.save();
        }
    
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
    
            return done(null, { user, token });
        } catch (err) {
            done(err);
        }
    }));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;