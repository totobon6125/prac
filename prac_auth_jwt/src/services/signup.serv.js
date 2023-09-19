import { SignUpRepo } from "../repositories/signup.repo.js"

export class SignUpServ {
    signUpRepository = new SignUpRepo();

    //# 회원 가입
    signUp = async (email, password) => {
        const signUp = await this.signUpRepository.signUp(email, password);

        return {
            email: signUp.email,
            password: signUp.password
        };
    };

    //! 회원가입 email 중복확인
    findUserByEmail = async (email) => {
        const user = await this.signUpRepository.findUserByEmail(email)

        return user;
    };
}