const {StatusCodes} = require('http-status-codes');
const Room = require('../models/room');
const User = require('../models/user');

const renderMain = async (req,res) => {
    const { page, pageSize } = req.query;

    try {
        const result = await fetchRooms({}, page, pageSize);
        return res.status(StatusCodes.OK).json(result);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '서버 에러가 발생했습니다.' });
    }
}

const search = async (req,res) => {
    const { searchName, page, pageSize } = req.query;

    try {
        const query = { roomName: { $regex: searchName, $options: 'i' } };
        const result = await fetchRooms(query, page, pageSize);
        return res.status(StatusCodes.OK).json(result);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '서버 에러가 발생했습니다.' });
    }
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
            roomStatus: room.status
        });

    } catch (err) {
        console.error('방 생성 중 에러 발생:', err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "방 생성에 실패했습니다.",
            error: err.message
        });
    }
}

const fetchRooms = async (query, page, pageSize) => {
    try {
        const currentPage = parseInt(page) || 1;
        const limit = parseInt(pageSize) || 4;
        const rooms = await Room.find(query).skip((currentPage - 1) * limit).limit(limit);
        const totalRooms = await Room.countDocuments(query);
        const totalPages = Math.ceil(totalRooms / limit);

        const roomData = rooms.map(room => ({
            roomId: room._id,
            masterImage: room.masterImage,
            masterNickname: room.masterNickname,
            roomName: room.roomName,
            roomMaxCount: room.roomMaxCount,
            roomUsersCount: room.roomUsers.length,
            roomStatus: room.status
        }));

        return {
            roomData,
            currentPage,
            totalPages
        };
    } catch (err) {
        console.error(err);
        throw new Error('서버 에러가 발생했습니다.');
    };
}

module.exports = {
    renderMain,
    search,
    mkgame,
};