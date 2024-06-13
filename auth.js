const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { StatusCodes } = require('http-status-codes');
dotenv.config();

const ensureAuthorization = (req, res, next) => {
    try {
        let receivedJwt = req.headers["authorization"];  // x-auth-token 헤더에서 토큰을 가져옴
        console.log("received jwt : ", receivedJwt);

        if (!receivedJwt) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "토큰이 제공되지 않았습니다."
            });
        }

        let decodedJwt = jwt.verify(receivedJwt, process.env.JWT_SECRET);
        console.log(decodedJwt);  // 여기에서 해독된 JWT 페이로드를 확인할 수 있습니다.
        req.user = decodedJwt;  // 해독된 JWT 정보를 요청 객체에 추가
        next();  // 다음 미들웨어로 제어를 넘김

    } catch (authorization) {
        if (authorization instanceof jwt.TokenExpiredError) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "토큰 만료"
            });
        } else if (authorization instanceof jwt.JsonWebTokenError) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "유효하지 않은 토큰"
            });
        } else if (authorization instanceof Error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "서버 오류"
            });
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "알 수 없는 오류"
            });
        }
    }
}

module.exports = ensureAuthorization;