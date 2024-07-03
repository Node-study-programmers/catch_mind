console.log(1);

const cors = require('cors');
const socketIo = require('./socket.js');
const dotenv = require("dotenv");
dotenv.config();

console.log(1);

const express = require("express");
const connectMongoDB = require('./models/index');
const app = express();
const fs = require('fs');
const path = require('path');
const http = require('http');
const initialWords = require('./words');
const Word = require('./models/word');

console.log(2);

// 서버 생성
const server = http.createServer(app);
const io = socketIo(server);

connectMongoDB();
app.use(cors());

console.log(3);


// Image 폴더가 없으면 생성
const imageFolder = path.join(__dirname, 'profileImages');
if (!fs.existsSync(imageFolder)) {
  fs.mkdirSync(imageFolder);
}

console.log(4);


const initializeDatabase = async () => {
  const count = await Word.countDocuments();
  if (count === 0) {
      try {
          for (const word of initialWords) {
              await Word.create({ word });
          }
          console.log('Initial words inserted successfully');
          console.log(`Number of initial words: ${initialWords.length}`);
      } catch (error) {
          console.error('Error inserting initial words:', error);
      }
  } else {
      console.log('Database already initialized');
  }
};

console.log(5);


app.use('/profileImages', express.static(path.join(__dirname, '../profileImages')));

const authRouter = require('./routes/auth');
const mypageRouter = require('./routes/mypage');
const rankRouter = require('./routes/rank');
const homeRouter = require('./routes/home');

console.log(6);


app.use('/auth', authRouter);
app.use('/mypage', mypageRouter);
app.use('/rank', rankRouter);
app.use('/home', homeRouter);

console.log(7);


const PORT = process.env.PORT || 9999; // 포트 설정을 이 줄로 이동
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    initializeDatabase();
});