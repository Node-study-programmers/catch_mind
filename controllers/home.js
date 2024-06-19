const {StatusCodes} = require('http-status-codes');
const Room = require('../models/room');
const User = require('../models/user');

const renderMain = async (req,res) => {
    const { page, pageSize } = req.query;
    try {
        const currentPage = parseInt(page) || 1; // 현재 페이지
        const limit = parseInt(pageSize) || 4; // 페이지 당 방의 수

        const rooms = await Room.find().skip((currentPage - 1) * limit).limit(limit);

        const totalRooms = await Room.countDocuments();
        const totalPages = Math.ceil(totalRooms / limit);

        const roomData = rooms.map(room => ({
            roomId: room._id,
            masterImage: room.masterImage,
            masterNickname: room.masterNickname,
            roomName: room.roomName,
            roomMaxCount: room.roomMaxCount,
            roomUsersCount: room.roomUsers.length,
         }));

        return res.status(StatusCodes.OK).json({
            roomData,
            currentPage: currentPage,
            totalPages: totalPages,
        });
    
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '서버 에러가 발생했습니다.' });
    };
}

const mkgame = async (req,res) => {
    const { masterImage, masterNickname, roomName } = req.body;

    if (!roomName) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "방 제목을 입력해주세요."
        });
    }

    try {
        const user = await User.findOne({ nickname: masterNickname });
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "사용자를 찾을 수 없습니다."
            });
        }

        const newRoom = new Room({
            masterImage: masterImage,
            masterNickname: masterNickname,
            roomName: roomName,
            roomUsers: [user._id]
        });

        await newRoom.save();

        const room = await Room.findOne({ masterNickname });

        return res.status(StatusCodes.OK).json({
            roomId: room._id,
            masterImage: room.masterImage,
            masterNickname: room.masterNickname,
            roomName: room.roomName,
            roomMaxCount: room.roomMaxCount,
            roomUsersCount: room.roomUsers.length,
        });

    } catch (err) {
        console.error('방 생성 중 에러 발생:', err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "방 생성에 실패했습니다.",
            error: err.message
        });
    }
}

module.exports = {
    renderMain,
    mkgame,
};