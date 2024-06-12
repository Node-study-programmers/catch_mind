const express = require('exrpess');

const router = express.Router();

// isLoggedIn 추가해야함
router.get('/', renderMain);
router.get('/mkgame', mkgame);