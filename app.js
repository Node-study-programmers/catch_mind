const cors = require('cors');

const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const connectMongoDB = require('./models/index');
const app = express();
const fs = require('fs');
const multer = require('multer');
const path = require('path');

connectMongoDB();
app.use(cors());

// Image 폴더가 없으면 생성
const imageFolder = path.join(__dirname, 'profileImages');
if (!fs.existsSync(imageFolder)) {
  fs.mkdirSync(imageFolder);
}

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
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});