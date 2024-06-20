const express = require('express');
const ensureAuthorization = require('../auth');
const { renderMain, search, mkgame } = require('../controllers/home');
const router = express.Router();
router.use(express.json());


// isLoggedIn 추가해야함
router.get('/', renderMain);
router.get('/search', search);
router.post('/mkgame',ensureAuthorization ,mkgame);

// router.post('/enter', ensureAuthorization, enter);

module.exports = router;