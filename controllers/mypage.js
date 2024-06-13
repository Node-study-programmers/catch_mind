const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');

const renderMypage = async (req,res) => {
    const user = await User.findOne({ id: req.user._id });
    return res.status(StatusCodes.OK).json({
        nickname: user.nickname,
        profileImage: user.profileImage,
        score: user.score
    })
}

const passwordReset = async (req,res) => {
    const { password1, password2 } = req.body;

    if (!password1 ||!password2) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "공백 채워"
        })
    }

    if (password1!== password2) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "비밀번호 불일치"
        })
    }

    const salt = crypto.randomBytes(10).toString('base64');
    const hashPassword = crypto.pbkdf2Sync(password1, salt, 10000, 10,'sha512').toString('base64');

    const user = await User.findOne({ id: req.user._id });
    user.salt = salt;
    user.password = hashPassword;
    await user.save();

    return res.status(StatusCodes.OK).json({
        message: "비밀번호 변경 성공~~~~~~~~"
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
        res.status(StatusCodes.OK).json({ message: '이미지 변경 성공' });
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
            message: "공백 채워"
        })
    }

    const user = await User.findOne({ id: req.user._id });
    user.nickname = nickname;
    await user.save();

    return res.status(StatusCodes.OK).json({
        message: "닉네임 변경 성공~~~~~~~~"
    })
}

const userDelete = async (req,res) => {
    try {
        const result = await User.deleteOne({ id: req.user._id });

        if (result.deletedCount === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "회원탈퇴 실패~~~~~~~~"
            })
        }

        return res.status(StatusCodes.OK).json({
            message: "회원탈퇴 성공~~~~~~~~"
        })
    } catch (err) {
        console.error(err);
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "서버 오류"
        })
    }
}

module.exports = {
    renderMypage,
    passwordReset,
    changeImage,
    changeNickname,
    userDelete
}