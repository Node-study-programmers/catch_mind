const {StatusCodes} = require('http-status-codes');
const crypto = require('crypto');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');


const passwordReset = async (req,res) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "공백이 있습니다."
            })
        }

        const salt = crypto.randomBytes(10).toString('base64');
        const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10,'sha512').toString('base64');

        const user = await User.findOne({ _id: req.user.id });
        user.salt = salt;
        user.password = hashPassword;
        await user.save();

        return res.status(StatusCodes.OK).json({
            message: "비밀번호 변경 성공"
        })
    } catch (err) {
        console.error(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "서버 오류"
        })
    }
}

const changeImage = async (req,res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "유저를 찾을 수 없습니다."
            })
        }

        if (user.profileImage && user.profileImage !== 'Basic.jpg') {
            const oldImagePath = path.join(__dirname, '../profileImages', user.profileImage);
            if (fs.existsSync(oldImagePath)) {
              fs.unlinkSync(oldImagePath);
            }
          }

        const imageFilename = req.file.filename;
        user.profileImage = imageFilename;
        await user.save();

        return res.status(StatusCodes.OK).json({
            profileImage: user.profileImage
        });

    } catch (err) {
        console.error(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "서버 오류"
        })
    }
}

const changeNickname = async (req,res) => {
    try {
        const { nickname } = req.body;

        if (!nickname) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "공백이 있습니다."
            })
        }

        const duplication = await User.findOne({ nickname });
        if (duplication) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "닉네임이 이미 사용 중입니다."
            })
        }

        const user = await User.findOne({ _id: req.user.id });
        user.nickname = nickname;
        await user.save();

        return res.status(StatusCodes.OK).json({
            nickname: user.nickname
        })
    } catch (err) {
        console.error(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "서버 오류"
        })
    }
}

const userDelete = async (req,res) => {
    try {
        const result = await User.deleteOne({ _id: req.user.id });

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