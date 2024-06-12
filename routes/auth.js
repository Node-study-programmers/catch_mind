const express = require('express');
const passport = require('passport');

const {isLoggedIn, isNotLoggedIn} = require('../middlewares/index');
const { join, login, logout } = require('../controllers/auth');

const router = express.Router();

router.use(express.json());

router.post('/join',isNotLoggedIn, join);
router.post('/login',isNotLoggedIn, login);
router.get('/logout',isLoggedIn, logout);
router.get('/kakao', passport.authenticate('kakao'));
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/?loginError=카카오로그인 실패',
}), (req, res) => {
    res.redirect('/'); // 성공 시 홈페이지로 이동
})

module.exports = router;