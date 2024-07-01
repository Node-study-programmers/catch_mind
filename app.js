const cors = require('cors');
const socketIo = require('./socket.js');
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const connectMongoDB = require('./models/index');
const app = express();
const fs = require('fs');
const path = require('path');
const http = require('http');


// 서버 생성
const server = http.createServer(app);
const io = socketIo(server);

connectMongoDB();
app.use(cors());

// Image 폴더가 없으면 생성
const imageFolder = path.join(__dirname, 'profileImages');
if (!fs.existsSync(imageFolder)) {
  fs.mkdirSync(imageFolder);
}

app.use('/profileImages', express.static(path.join(__dirname, '../profileImages')));

const authRouter = require('./routes/auth');
const mypageRouter = require('./routes/mypage');
const rankRouter = require('./routes/rank');
const homeRouter = require('./routes/home');
// const gameRouter = require('./routes/game');
// const roomRouter = require('./routes/room');

app.use('/auth', authRouter);
app.use('/mypage', mypageRouter);
app.use('/rank', rankRouter);
app.use('/home', homeRouter);
// app.use('/game', gameRouter);
// app.use('/room', roomRouter);

const PORT = process.env.PORT || 9999; // 포트 설정을 이 줄로 이동
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});