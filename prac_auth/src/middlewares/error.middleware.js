import { CustomError } from "../errors/customError.js";

export default function (err, req, res, next) {

    if (err instanceof CustomError) {
        return res.status(err.status).json({ errorMessage: err.message })
    };

    return res.status(500).json({ errorMessage: '서버 내부 에러가 발생했습니다.' });
};
