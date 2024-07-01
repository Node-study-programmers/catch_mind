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

                socket.room = room;
                socket.join(socket.room.id);
                console.log(`${socket.user.nickname}님이 ${socket.room.name}에 입장하셨습니다.`);
                io.to(socket.room.id).emit('message', `${socket.user.nickname}님이 입장하셨습니다.`);
            } catch (err) {
                console.error('Room 입장 중 에러:', err);
                socket.emit('error', '방에 입장하는 중 에러가 발생했습니다.');
            }
        });

        // 메세지 전송
        socket.on('sendMessage', (data) => {
            const messageData = {
                message: data.message,
                nickname: socket.user.nickname,
            }
            io.to(data.room).emit('message', messageData);
        })

        socket.on('leaveRoom', async () => {
            try {
                socket.leave(socket.room.id);
                console.log(`${socket.user.nickname}님이 ${socket.room.name}에서 퇴장하셨습니다.`);
                io.to(socket.room.id).emit('message', `${socket.user.nickname}님이 퇴장하셨습니다.`);
            } catch (err) {
                console.error('Room 입장 중 에러:', err);
                socket.emit('error', '방에 입장하는 중 에러가 발생했습니다.');
            }
        });

        socket.on('disConnect', () => {
            console.log(`${socket.user.nickname}님 서버 연결 해제`);
            socket.leave(socket.room.id);
            io.to(socket.room.id).emit('message', `${socket.user.nickname}님이 퇴장하셨습니다.`);
            socket.room = null;
        });
    });
}