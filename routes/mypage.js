const express = require('express');
const ensureAuthorization = require('../auth');
const multer = require('multer');
const path = require('path');

const router = express.Router();
router.use(express.json());
router.use(ensureAuthorization);

const { renderMypage, passwordReset, changeImage, changeNickname, userDelete } = require('../controllers/mypage');

// Multer 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("1");
        cb(null, path.join(__dirname, '../profileImages'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
        console.log("2");
    }
});
const upload = multer({ storage });


router.get('/', renderMypage);
router.put('/passwordReset', passwordReset);
router.put('/changeImage', upload.single('file'), changeImage);    
router.put('/changeNickname', changeNickname);
router.delete('/userDelete', userDelete);

module.exports = router;