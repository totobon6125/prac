import { SignUpServ } from "../services/signup.serv.js"

export class SignUpCtr {
    signUpService = new SignUpServ();

    //# 회원 가입
    signUp = async (req, res, next) => {
        try {
            const { email, password, confirm } = req.body;

            //!email 형태 확인
            const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
            if (!emailRegex.test(email)) { return res.status(400).json({ errorMessage: 'email 조건에 맞지 않습니다.' }) }
            
            //! email 중복확인
            await this.signUpService.findUserByEmail(email);

            //! 비밀번호 확인
            const passwordRegex = new RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9]).{4,}$/i);
            if (password.includes(email)) { return res.status(412).json({ errorMessage: '패스워드에 email이 포함되어 있습니다.' }) };
            if (!passwordRegex.test(password)) { return res.status(400).json({ errorMessage: 'password 조건에 맞지 않습니다.' }) }
            if (password !== confirm) { return res.status(412).json({ errorMessage: '패스워드와 확인 이 다릅니다.' }) };

            await this.signUpService.signUp(email, password);

            return res.status(201).json({ message: '회원가입에 성공하였습니다.' });
        } catch (err) {
            next(err);
        }
    }
}