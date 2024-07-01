// const socketIo = require('socket.io');
// const jwt = require('jsonwebtoken');

// module.exports = (server) => {
//     const io = socketIo(server);
//     io.use((socket, next) => {
//         const token = socket.handshake.query.token;
//         if (token) {
//             jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//                 if (err) {
//                     return next(new Error('토큰 에러'));
//                 }
//                 socket.user = decoded;
//                 next();
//             });
//         } else {
//             return next(new Error('토큰이 없습니다'));
//         }
//     });

//     io.on('connection', (socket) => {
//         console.log(`${socket.user.nickname}님 서버 연결`);

//         // 방 입장
//         socket.on('joinRoom', (room) => {
//             socket.join(room);
//             console.log(`${socket.user.nickname}님이 ${room}에 입장하셨습니다.`);
//         })

//         // 메세지 전송
//         socket.on('sendMessage', (data) => {
//             io.to(data.room).emit('message', `${socket.user.nickname}: ${data.message}`);
//         })

//         socket.on('leaveRoom', (room) => {
//             socket.leave(room);
//             console.log(`${socket.user.nickname}님이 ${room}에서 퇴장하셨습니다.`);
//         })

//         socket.on('disconnect', () => {
//             console.log(`${socket.user.nickname}님 서버 연결 해제`);
//         })
//     });
// }