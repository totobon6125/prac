import express from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const router = express.Router();

//* 리프레쉬 토큰을 관리할 객체
const tokenStorages = {}

//* 비밀 키는 외부에 노출되면 안되겠죠? 그렇기 때문에, .env 파일을 이용해 비밀 키를 관리해야합니다.
//# Access Token의 비밀 키를 정의합니다.
const ACCESS_TOKEN_SECRET_KEY = process.env.AC_KEY;
//# Refresh Token의 비밀 키를 정의합니다.
const REFRESH_TOKEN_SECRET_KEY = process.env.RF_KEY;

//* 액세스 리프레시 토큰 발급
router.get('/token', async (req, res) => {
    //# ID 전달
    const { email } = req.body;

    //# 액세스 토큰 발급
    const accessToken = createAccessToken(email);
    
    // const accessToken = jwt.sign({ email: email },
    //     ACCESS_TOKEN_SECRET_KEY,
    //     { expiresInt: '10s' } // 토큰 유효 기간
    // );

    //# 리프래시 토큰 발급
    const refreshToken = jwt.sign({ email: email },
        ACCESS_TOKEN_SECRET_KEY,
        { expiresInt: '10m' } // 토큰 유효 기간
    );

    tokenStorages[refreshToken] = {
        email: email,
        ip: req.ip,
        // 특정 클라이언트가 어떤 방식으로 서버에 요청했는가? (ex. chrome, firefox, etc)
        userAgent: req.headers['user-agent']
    }

    //# 클라이언트에게 토큰을 할당
    res.cookie('accessToken', accessToken);
    res.cookie('refreshToken', refreshToken);

    return res.status(200).json({ message: 'Token이 정상적으로 발급되었습니다' });

});



//* 엑세스 토큰 검증 API
router.get('/tokens/validate', (req, res) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        return res
            .status(400)
            .json({ errorMessage: 'Access Token이 존재하지 않습니다.' });
    }

    const payload = validateToken(accessToken, ACCESS_TOKEN_SECRET_KEY);
    if (!payload) {
        return res
            .status(401)
            .json({ errorMessage: 'Access Token이 유효하지 않습니다.' });
    }

    const { id } = payload;
    return res.json({
        message: `${id}의 Payload를 가진 Token이 성공적으로 인증되었습니다.`,
    });
});

// Token을 검증하고 Payload를 반환합니다.
function validateToken(token, secretKey) {
    try {
        const payload = jwt.verify(token, secretKey);

        return payload;
    } catch (error) {

        return null;
    }
}

function createAccessToken(email) {
    return jwt.sign({ email: email }, ACCESS_TOKEN_SECRET_KEY, { expiresInt: '10s' }); // 토큰 유효 기간
}


//* 리프레시 토큰 검증 API 및 ACCESS TOKEN 재발행 하기
app.post('/tokens/refresh', (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {

        return res.status(400).json({ errorMessage: 'Refresh Token이 존재하지 않습니다.' });
    }

    const payload = validateToken(refreshToken, REFRESH_TOKEN_SECRET_KEY);

    if (!payload) {

        return res.status(401).json({ errorMessage: 'Refresh Token이 유효하지 않습니다.' });
    }

    const userInfo = tokenStorages[refreshToken];

    if (!userInfo) {

        return res.status(419).json({ errorMessage: 'Refresh Token의 정보가 서버에 존재하지 않습니다.' });
    }

    const newAccessToken = createAccessToken(userInfo.email);

    res.cookie('accessToken', newAccessToken);
    return res.json({ message: 'Access Token을 새롭게 발급하였습니다.' });
});

// Token을 검증하고 Payload를 반환합니다.
function validateToken(token, secretKey) {
    try {
        const payload = jwt.verify(token, secretKey);

        return payload;
    } catch (error) {

        return null;
    }
}