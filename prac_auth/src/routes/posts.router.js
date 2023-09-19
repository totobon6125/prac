import express from 'express';

import { PostsCtr } from '../controllers/posts.ctr.js'
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();
const postsController = new PostsCtr(); // PostsController 를 인스턴스화 시킨다.

// 게시글 생성 API
router.post('/posts', authMiddleware, postsController.createPost); // 요청이 들어오면 해당하는 컨트롤러로 요청을 전달함.

// 게시글 조회 API
router.get('/posts', authMiddleware, postsController.getPosts);

export default router;