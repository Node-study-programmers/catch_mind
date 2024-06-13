const express = require('express');

const router = express.Router();
router.use(express.json());

const { renderRank } = require('../controllers/rank');

router.get('/', renderRank);

module.exports = router;