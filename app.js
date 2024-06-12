const express = require("express");
const dotenv = require("dotenv");
const passport = require("passport");
const bodyParser = require('body-parser');
const connectMongoDB = require('./models/index');

const app = express();
dotenv.config();

app.listen(process.env.PORT)

connectMongoDB();

const authRouter = require('./routes/auth');
// const gameRouter = require('./routes/game');
// const homeRouter = require('./routes/home');
// const mypageRouter = require('./routes/mypage');
// const rankRouter = require('./routes/rank');
// const roomRouter = require('./routes/room');

app.use('/auth', authRouter);
// app.use('/game', gameRouter);
// app.use('/', homeRouter);
// app.use('/mypage', mypageRouter);
// app.use('/rank', rankRouter);
// app.use('/room', roomRouter);