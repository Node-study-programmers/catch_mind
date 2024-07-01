const express = require('express');
const ensureAuthorization = require('../auth');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
router.use(express.json());
router.use(ensureAuthorization);

const { passwordReset, changeImage, changeNickname, userDelete } = require('../controllers/mypage');

// 파일 저장 경로 및 파일명 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../profileImages'));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, uuidv4() + ext);
    }
});

// 파일 형식 필터링 ( 이미지 파일만 허용 )
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('이미지 파일만 업로드할 수 있습니다.'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5  // 5MB
    }
 });

router.put('/passwordReset', passwordReset);
router.put('/changeImage', upload.single('profileImage'), changeImage);    
router.put('/changeNickname', changeNickname);
router.delete('/userDelete', userDelete);

module.exports = router;