import { prisma } from '../utils/prisma/index.js'

export class SignUpRepo {

    //# 회원 가입
    signUp = async (email, password) => {
        const signUp = await prisma.users.create({
            data: {
                email,
                password
            }
        });
        
        return signUp;
    };
    
    //! 회원가입 email 중복확인
    findUserByEmail = async (email) => {
        const eMail = await prisma.users.findUnique({
            where: {email}
        });
        if(eMail) {
            throw new CustomError(412,'중복된 닉네임입니다')
        };

        
        
        return eMail;
    };
};
