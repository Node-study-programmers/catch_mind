const express = require('express');
const ensureAuthorization = require('../auth');
const { renderMain, mkgame } = require('../controllers/home');
const router = express.Router();
router.use(express.json());


// isLoggedIn 추가해야함
router.get('/', renderMain);
router.post('/mkgame',ensureAuthorization ,mkgame);
// router.post('/enter', ensureAuthorization, enter);

module.exports = router;