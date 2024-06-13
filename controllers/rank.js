const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user');


const renderRank = async (req,res) => {
    try {
        const users = await User.find().sort({ score: -1 }).limit(10);
        const rankking = users.map(user => ({
           nickname: user.nickname,
           score: user.score,
           profileImage: user.profileImage 
        }));

        return res.status(StatusCodes.OK).json(rankking);

    } catch (err) {
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "서버 에러"
        });
    }
}

module.exports = {
    renderRank,
}