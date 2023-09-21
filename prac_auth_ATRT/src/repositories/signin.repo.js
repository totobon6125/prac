import jwt from 'jsonwebtoken';

import { prisma } from '../utils/prisma/index.js'


export class SignInRepo {

    //# 로그인
    signIn = async (email, password) => {
        const signIn = await prisma.users.findUnique({
            where: { email }
        });

        if (!signIn) {
            throw new CustomError(412, 'email 을 확인해주세요')
        } else if (signIn.password !== password) {
            throw new CustomError(412, '패스워드를 확인해주세요')
        };

        const token = jwt.sign({ userId: signIn.userId },
            process.env.jwt_key,
            { expiresIn: '10m' }
        );
        return token;
    };

};
