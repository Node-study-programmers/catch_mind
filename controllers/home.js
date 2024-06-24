const {StatusCodes} = require('http-status-codes');
const Room = require('../models/room');
const User = require('../models/user');

const renderMain = async (req,res) => {
    const { searchName, page, pageSize } = req.query;

    try {
        const query = searchName ? { roomName: { $regex: searchName, $options: 'i' } } : {};
        const result = await fetchRooms(query, page, pageSize);
        return res.status(StatusCodes.OK).json(result);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '서버 에러가 발생했습니다.' });
    }
}

const enterRoom = async (req,res, next) => {
    try {
        const { roomId } = req.body;
        const room = await Room.findOne({ _id: roomId });
        if (!room) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "방을 찾을 수 없습니다."
            });
        }

        const user = await User.findOne({ _id: req.user.id });
        
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "사용자를 찾을 수 없습니다."
            });
        }

        if (room.roomUsers.some(u => u.userId.equals(user.id))) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "사용자가 이미 방에 있습니다."
            });
        }

        if (room.roomStatus === 'playing') {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "이미 게임이 진행중입니다."
            })
        }

        if (room.roomUsers.length >= room.roomMaxCount) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "방이 가득 찼습니다."
            });
        }

        room.roomUsers.push({
            userId: user.id,
            nickname: user.nickname,
            profileImage: user.profileImage,
            score: user.score
        });
        await room.save();

        return res.status(StatusCodes.OK).json({
            roomUsers: room.roomUsers
        });

    } catch (err) {
        console.error(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "서버 에러"
        });
    }
}

const createRoom = async (req,res) => {
    const { roomName } = req.body;

    if (!roomName) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "방 제목을 입력해주세요."
        });
    }

    try {
        const user = await User.findOne({ _id: req.user.id });
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "사용자를 찾을 수 없습니다."
            });
        }

        const newRoom = new Room({
            masterImage: user.profileImage,
            masterNickname: user.nickname,
            roomName: roomName,
        });

        await newRoom.save();

        const room = await Room.findOne({ masterNickname: user.nickname });
        return res.status(StatusCodes.OK).json({
            roomId: room.id,
            masterImage: room.masterImage,
            masterNickname: room.masterNickname,
            roomName: room.roomName,
            roomMaxCount: room.roomMaxCount,
            roomUsersCount: room.roomUsers.length,
            roomStatus: room.roomStatus
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
        const rooms = await Room.find(query).sort({ createdAt: -1 }).skip((currentPage - 1) * limit).limit(limit);
        const totalRooms = await Room.countDocuments(query);
        const totalPages = Math.ceil(totalRooms / limit);

        const roomData = rooms.map(room => ({
            roomId: room._id,
            masterImage: room.masterImage,
            masterNickname: room.masterNickname,
            roomName: room.roomName,
            roomMaxCount: room.roomMaxCount,
            roomUsersCount: room.roomUsers.length,
            roomStatus: room.roomStatus
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
    enterRoom,
    createRoom,
};