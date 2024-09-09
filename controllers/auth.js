const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user');

const generateAccessToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRATION });
}

const generateRefreshToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRATION });
}

const join = async (req,res) => {
    const { email, password, nickname } = req.body;
    if (!email || !nickname || !password ) { 
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "공백이 있습니다."
        })};
    
    try {
        // 이메일 중복 확인
        let user = await User.findOne({ email });
        if (user) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: '이메일이 이미 사용 중입니다.'
            });
        }

        // 닉네임 중복 확인
        user = await User.findOne({ nickname });
        if (user) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: '닉네임이 이미 사용 중입니다.'
            });
        }

        const salt = crypto.randomBytes(10).toString('base64');
        const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');
        
        const newUser = new User({
            email,
            password: hashPassword,
            nickname,
            salt,
            profileImage: 'Basic.jpg'
        });

        await newUser.save();
        return res.status(StatusCodes.OK).json({
            message: "회원가입 완료!"
        });

    } catch (err) {
        console.error(err);
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: '서버 오류'
        })
    } 
}

const login = async (req,res) => {
    const { email, password } = req.body;

    if (!email || !password ) { 
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "아이디 또는 비밀번호를 입력해야합니다."
        })};
        
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "존재하지 않는 이메일입니다."
            })
        }

        const hashPassword = crypto.pbkdf2Sync(password, user.salt, 10000, 10, 'sha512').toString('base64');
        if (hashPassword!== user.password) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "비밀번호가 틀렸습니다."
            })
        }

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("accessToken", accessToken, { httpOnly : true });

        return res.status(StatusCodes.OK).json({
            nickname: user.nickname,
            email: user.email,
            profileImage: user.profileImage,
            score: user.score,
        });
       
    } catch(err) {
        console.log(err);
    }
}

const logout = async (req,res) => {
    return res.status(StatusCodes.OK).json({
        message: "로그아웃 성공"
    })
}

module.exports = {
    join,
    login,
    logout
};