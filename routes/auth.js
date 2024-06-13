const express = require('express');
const passport = require('passport');

const { join, login, logout } = require('../controllers/auth');

const router = express.Router();

router.use(express.json());

router.post('/join', join);
router.post('/login', login);
router.get('/logout', logout);
router.get('/kakao', passport.authenticate('kakao'));
router.get('/kakao/callback', passport.authenticate('kakao', { 
    session: false,
    failureRedirect: '/?loginError=카카오로그인 실패'
}), (req, res) => {
    const { token } = req.user;
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/');
});

module.exports = router;