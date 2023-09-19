import express from 'express';

import { SignUpCtr } from '../controllers/signup.ctr.js'


const router = express.Router();
const signUpController = new SignUpCtr(); 

//* 회원가입 API
router.post('/signUp', signUpController.signUp); 

export default router;