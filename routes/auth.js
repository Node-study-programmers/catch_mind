const express = require('express');

const { join, login, logout } = require('../controllers/auth');

const router = express.Router();

router.use(express.json());

router.post('/join', join);
router.post('/login', login);
router.get('/logout', logout);
module.exports = router;