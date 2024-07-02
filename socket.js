const socketIo = require('socket.io');
const User = require('./models/User');
const Room = require('./models/Room');
const Word = require('./models/Word');

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
        socket.on('joinRoom', async roomId => {
            try {
                const room = await Room.findById(roomId);
                if (!room) {
                    return socket.emit('error', '방이 존재하지 않습니다.');
                }
                const findUser = room.roomUsers.find(user => user.nickname === socket.user.nickname);
                if (!findUser) {
                    room.roomUsers.push({
                        userId: socket.user._id,
                        nickname: socket.user.nickname,
                        profileImage: socket.user.profileImage,
                        score: socket.user.score,
                    });
                    
                    await room.save();
                } 
                
                socket.join(roomId);
                io.to(roomId).emit('updateRoom', room.roomUsers);
            } catch (err) {
                console.error('Room 입장 중 에러:', err);
                socket.emit('error', '방에 입장하는 중 에러가 발생했습니다.');
            }
        });
        
        socket.on('gameStart', async (roomId) => {
            try {
                const room = await Room.findById(roomId);
                if (!room) {
                    return socket.emit('error', '방이 존재하지 않습니다.');
                }

                const randomWordDoc = await Word.aggregate([{ $sample: { size: 1 } }]);
                const randomWord = randomWordDoc[0]?.word || '기본 단어';

                room.roomStatus = 'playing';
                await room.save();

                const messageData = {
                    nickname: room.roomUsers[0].nickname,
                    question: randomWord,
                    roomStatus: room.roomStatus
                }
                
                io.to(roomId).emit('gameStart', messageData);

            } catch (err) {
                console.error('Room 입장 중 에러:', err);
                socket.emit('error', '방에 입장하는 중 에러가 발생했습니다.');
            }
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

        socket.on('nextTurn', async (data) => {
            try {
                const room = await Room.findById(data.roomId);
                if (!room) {
                    return socket.emit('error', '방이 존재하지 않습니다.');
                }

                let nextUserNickname;
                const findUserIndex = room.roomUsers.findIndex(user => user.nickname === data.nickname);
                if (findUserIndex !== -1 && findUserIndex + 1 < room.roomUsers.length) {
                    nextUserNickname = room.roomUsers[findUserIndex + 1].nickname;
                } else {
                    nextUserNickname = room.roomUsers[0].nickname;
                }

                const randomWordDoc = await Word.aggregate([{ $sample: { size: 1 } }]);
                const randomWord = randomWordDoc[0]?.word || '기본 단어';

                const messageData = {
                    nickname: nextUserNickname,
                    question: randomWord
                }

                io.to(data.roomId).emit('nextTurn', messageData);

            } catch (err) {
                console.error('다음 차례 진행 중 에러:', err);
                socket.emit('error', '다음 차례 진행 중 에러가 발생했습니다.');
            }
        })


        socket.on('darw', async (data) => {
            try {
                const room = await Room.findById(data.roomId);
                if (!room) {
                    return socket.emit('error', '방이 존재하지 않습니다.');
                }
                const xy = {
                    x: data.x,
                    y: data.y
                }

                io.to(data.roomId).emit('draw', xy);
            } catch (err) {
                console.error('��자 그리기 중 에러:', err);
                socket.emit('error', '��자 그리기 중 에러가 발생했습니다.');
            }
        })

        socket.on('finishGame', async (data) => {
            try {
                const room = await Room.findById(data.roomId);
                if (!room) {
                    return socket.emit('error', '방이 존재하지 않습니다.');
                }

                for (const userData of data.users) {
                    const user = await User.findOne({ nickname: userData.nickname });
                    if (user) {
                        user.score += userData.score;
                        await user.save();
                    } else {
                        console.warn(`사용자를 찾을 수 없습니다: ${userData.nickname}`);
                    }
                }

                room.roomStatus = 'waiting';
                await room.save();

                io.to(data.roomId).emit('finishGame', room.roomStatus);

            } catch (err) {
                console.error('게임 종료 중 에러:', err);
                socket.emit('error', '게임 종료 중 에러가 발생했습니다.');
            }
        })

        socket.on('leaveRoom', async (roomId) => {
            try {
                const room = await Room.findById(roomId);
                if (!room) {
                    return socket.emit('error', '방이 존재하지 않습니다.');
                }

                room.roomUsers = room.roomUsers.filter((user) => user.nickname !== socket.user.nickname);
                await room.save();

                if (room.roomUsers.length === 0) {
                    await Room.findByIdAndDelete(roomId);
                } else {
                    await room.save();
                    io.to(roomId).emit('updateRoom', room.roomUsers);
                }
                socket.leave(roomId);
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