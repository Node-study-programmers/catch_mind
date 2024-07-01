const socketIo = require('socket.io');
const User = require('./models/User');
const Room = require('./models/Room');

module.exports = (server) => {
    const io = socketIo(server, {path : '/socket.io', cors: { origin: '*'}});

    io.use(async (socket, next) => {
        const email = socket.handshake.query.email;
        if (email) {
            try {
                const user = await User.findOne({ email: email });
                if (!user) {
                    return next(new Error('유저 정보가 없습니다.'));
                }
                socket.user = user; // 사용자 정보를 소켓에 저장합니다.
                next();
            } catch (err) {
                return next(new Error('DB 에러'));
            }
        } else {
            next(new Error('유저 정보가 없습니다.'));
        }
    });

    io.on('connection', (socket) => {
        console.log(`${socket.user.nickname}님 서버 연결`);

        // 방 입장
        socket.on('joinRoom', async (roomId) => {
            try {
                const room = await Room.findById(roomId);
                if (!room) {
                    return socket.emit('error', '방이 존재하지 않습니다.');
                }

                room.roomUsers.push({
                    userId: socket.user.id,
                    nickname: socket.user.nickname,
                    profileImage: socket.user.profileImage,
                    score: socket.user.score
                });
                await room.save();

                socket.join(roomId);
                io.to(roomId).emit('joinRoom', room.roomUsers);
            } catch (err) {
                console.error('Room 입장 중 에러:', err);
                socket.emit('error', '방에 입장하는 중 에러가 발생했습니다.');
            }
        });
        
        socket.on('GameStart', async (roomId) => {
            const room = await Room.findById(roomId);
            if (!room) {
                return socket.emit('error', '방이 존재하지 않습니다.');
            }

            room.roomStatus = 'playing';
            await room.save();
            io.to(roomId).emit('GameStart', 'GameStart');
        })

        // 메세지 전송
        socket.on('sendMessage', (data) => {
            const messageData = {
                message: data.message,
                nickname: socket.user.nickname,
                isAnswer: data.isAnswer,
            }
            io.to(data.roomId).emit('sendMessage', messageData);
        })

        socket.on('nextTurn', () => {
            let turnIndex = static_value();
            const messageData = {
                nickname: socket.user.nickname,

            }
            io.to(data.roomId).emit('sendMessage', messageData);
        })

        socket.on('leaveRoom', async (roomId) => {
            try {
                socket.leave(roomId);
                const room = await Room.findById(roomId);
                if (!room) {
                    return socket.emit('error', '방이 존재하지 않습니다.');
                }
                console.log(`${socket.user.nickname}님이 ${room.name}에서 퇴장하셨습니다.`);
                io.to(roomId).emit('leaveRoom', `${socket.user.nickname}님이 퇴장하셨습니다.`);
            } catch (err) {
                console.error('Room 퇴장 중 에러:', err);
                socket.emit('error', '방에서 퇴장하는 중 에러가 발생했습니다.');
            }
        });

        socket.on('disconnect', async () => {
            console.log(`${socket.user.nickname}님 서버 연결 해제`);
            try {
                // 사용자가 속한 모든 방에서 퇴장 처리
                const rooms = Object.keys(socket.rooms);
                for (const roomId of rooms) {
                    socket.leave(roomId);
                    const room = await Room.findById(roomId);
                    if (room) {
                        io.to(roomId).emit('message', {
                            user: 'system',
                            message: `${socket.user.nickname}님이 퇴장하셨습니다.`
                        });
                    }
                }
            } catch (err) {
                console.error('연결 해제 중 에러:', err);
            }
        });
    });
}