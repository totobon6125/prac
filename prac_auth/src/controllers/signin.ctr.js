import { SignInServ } from "../services/signin.serv.js"

export class SignInCtr {
    signInService = new SignInServ();

    //# 로그인 API
    signIn = async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const token = await this.signInService.signIn(email, password);

            res.cookie('Authorization', `Bearer ${token}`);

            return res.status(200).json({ Message: "로그인 성공" });
        } catch (err) {
            next(err)
        }
    }

    //# 로그 아웃 API
    signOut = async (req, res, next) => {
        try {
            const token = token = req.headers.authorization.split(' ')[1];
            console.log(token)

            return res.status(200).json({ "token": token });
        } catch (err) {
            res.status(400).json({ errMessage: '이미 로그아웃 하셨습니다.' });
        }
    }
}