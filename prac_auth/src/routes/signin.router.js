import express from 'express';

import { SignInCtr } from '../controllers/signin.ctr.js'


const router = express.Router();
const signInController = new SignInCtr(); 

//* 로그인 API
router.post('/signin', signInController.signIn); 
router.post('/signout', signInController.signOut); 

export default router;