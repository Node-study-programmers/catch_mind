const express = require('express');
const ensureAuthorization = require('../auth');
const { renderMain, search, enterRoom, createRoom } = require('../controllers/home');
const router = express.Router();
router.use(express.json());

router.get('/', renderMain);
router.get('/search', search);
router.post('/enterRoom', ensureAuthorization, enterRoom);
router.post('/createRoom',ensureAuthorization ,createRoom);

module.exports = router;