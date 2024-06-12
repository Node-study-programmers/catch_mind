const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user');

const join = async (req,res) => {
    const { email, password, nickname } = req.body;

    if (!email || !nickname || !password ) { 
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "공백 채워"
        })};
    
    try {
        const salt = crypto.randomBytes(10).toString('base64');
        const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');
        
        const newUser = new User({
            email,
            password: hashPassword,
            nickname,
            salt
        });

        await newUser.save();
        return res.status(StatusCodes.OK).json({
            message: "수혁님 만세!"
        });

    } catch (err) {
        if (err.name == "MongoServerError") {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: '중복'
            })}
    }
}

const login = async (req,res) => {
    const { email, password } = req.body;

    if (!email || !password ) { 
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "공백 채워"
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
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "비밀번호가 틀렸습니다."
            })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.cookie("token", token, { httpOnly : true });

        return res.status(StatusCodes.OK).json({
            user,
            token
        });
       
    } catch(err) {
        console.log(err);
    }
}

const logout = async (req,res) => {
    req.logout(() => {
        res.redirect('/');
    });
}

module.exports = {
    join,
    login,
    logout
};