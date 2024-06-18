const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');

const passwordReset = async (req,res) => {
    const { password } = req.body;

    if (!password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "공백이 있습니다."
        })
    }

    const salt = crypto.randomBytes(10).toString('base64');
    const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10,'sha512').toString('base64');

    const user = await User.findOne({ id: req.user._id });
    user.salt = salt;
    user.password = hashPassword;
    await user.save();

    return res.status(StatusCodes.OK).json({
        message: "비밀번호 변경 성공"
    })

}

const changeImage = async (req,res) => {
    try {
        // 파일 이름을 User._id로 보내달라. (토큰 뜯어서 id 조회가능하면)
        const imageFilename = req.file.filename;
        const user = await User.findOne({ id: user._id });

        if (user.profileImage) {
            const oldImagePath = path.join(__dirname, '../profileImages', user.profileImage);
            if (fs.existsSync(oldImagePath) && oldImagePath.length != "Basic") {
              fs.unlinkSync(oldImagePath);
            }
        }
        user.profileImage = imageFilename;
        await user.save();
        res.status(StatusCodes.OK).json({ profileImage: user.profileImage });
    } catch (err) {
        console.error(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "서버 오류"
        })
    }
}

const changeNickname = async (req,res) => {
    const { nickname } = req.body;

    if (!nickname) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "공백이 있습니다."
        })
    }

    const user = await User.findOne({ id: req.user._id });
    user.nickname = nickname;
    await user.save();

    return res.status(StatusCodes.OK).json({
        nickname: user.nickname
    })
}

const userDelete = async (req,res) => {
    try {
        const result = await User.deleteOne({ id: req.user._id });

        if (result.deletedCount === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "회원탈퇴 실패"
            })
        }

        return res.status(StatusCodes.OK).json({
            message: "회원탈퇴 성공"
        })
    } catch (err) {
        console.error(err);
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "서버 오류"
        })
    }
}

module.exports = {
    passwordReset,
    changeImage,
    changeNickname,
    userDelete
}