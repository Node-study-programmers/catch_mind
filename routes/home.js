const express = require('express');
const ensureAuthorization = require('../auth');
const { renderMain, enterRoom, createRoom, leaveRoom } = require('../controllers/home');
const router = express.Router();
router.use(express.json());

router.get('/', renderMain);
router.post('/enterRoom', ensureAuthorization, enterRoom);
router.post('/createRoom',ensureAuthorization ,createRoom);

module.exports = router;