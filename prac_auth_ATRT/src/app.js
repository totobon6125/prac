import express from 'express';
// cors 정책을 설정할 수 있는 모듈?
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import indexRouter from './routes/index.js';

// .env 설치 해야 배포할 때 문제가 안 생김.
dotenv.config();

const app = express();
const PORT = process.env.port


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// CORS 정책 설정
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // 모든 출처에서의 요청 허용
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*")
  return res.json({ message: "환영 합니당!@." })
})

app.use('/api', [indexRouter]);

app.listen(PORT, () => {
  console.log(`${PORT}포트 연결!`);
});

