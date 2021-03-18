const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');

const { sequelize } = require('./models');

dotenv.config();

const app = express();

const userRoute = require('./routes/user');
const drugRoute = require('./routes/drug');
const prscRoute = require('./routes/prsc');
const pageRoute = require('./routes/page');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session=cookie',
}))
sequelize.sync({ force: false }).
then(() => {
    console.log('데이터베이스 연결 성공');
}).catch(err => {
    console.log('연결 실패', err);
});

app.use('/user', userRoute);
app.use('/drug', drugRoute);
app.use('/prsc', prscRoute);
app.use('/page', pageRoute);


app.use(function (req, res, next) {
    res.status(404);
    res.json({
        message: '서버 오류 발생'
    });
});

module.exports = app;