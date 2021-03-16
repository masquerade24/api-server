const jwt = require('jsonwebtoken');

// 토큰을 verify해보자.
function checkAuth(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1]; // 여기서 token만 가져올거임
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // nodemon.json을 만드는 방법도 있다 (흑형 유튜브 9장 6:00 참조)
        req.userData = decodedToken;
        next();
    } catch(error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(419).json({
                code: 419,
                message: '토큰이 만료되었습니다',
            })
        }
        return res.status(401).json({
            message: '유효하지 않은 토큰입니다.',
            error,
        });
    };
}

module.exports = {
    checkAuth,
};