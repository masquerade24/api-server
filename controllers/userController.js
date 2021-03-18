const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const models = require('../models/');

function signUp(req, res) {
    models.User
        .findOne({ where: { email: req.body.email } })
        .then(result => {
            if (result) {
                res.status(409).json({
                    message: "Email already exists!",
                });
            } else {
                bcryptjs.genSalt(10, function (err, salt) {
                    bcryptjs.hash(req.body.password, salt, function (err, hash) {
                        const user = {
                            name: req.body.name,
                            email: req.body.email,
                            password: hash,
                        }

                        models.User.create(user)
                            .then(result => {
                                res.status(201).json({
                                    message: 'User created successfully',
                                })
                            })
                            .catch(error => { // user 생성 실패!
                                res.status(500).json({
                                    message: 'Something went wrong!',
                                })
                            });
                    })
                })
            }
        })
        .catch(error => { // user 생성 실패
            res.status(500).json({
                message: 'Something went wrong!',
            })
        });
}

function login(req, res) {
    models.User
        .findOne({ where: { email: req.body.email } })
        .then(user => {
            console.log(user.dataValues);
            if (user === null) {
                res.status(401).json({
                    message: 'Invalid credentials!'
                });
            } else {
                bcryptjs.compare(req.body.password, user.password, function (err, result) {
                    if (result) { // true면 일치한다는 뜻
                        const token = jwt.sign({
                            email: user.email,
                            name: user.name,
                        }, process.env.JWT_SECRET, function (err, token) {
                            res.status(200).json({
                                message: '로그인 성공! 토큰이 정상적으로 발급되었습니다!',
                                token,
                            });
                        });
                    } else {
                        res.status(401).json({
                            message: 'Invalid credentials!',
                        });
                    }
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Something went wrong!'
            });
        });
}

function logout(req, res) {

}

module.exports = {
    signUp,
    login,
    logout,
};