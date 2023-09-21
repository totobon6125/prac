//# 비지니스 계층과 연결하기
import { PostsServ } from "../services/posts.serv.js";

//# Post의 컨트롤러(Controller) 역할을 하는 클래스
export class PostsCtr {
    //* Post 서비스 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.
    postsService = new PostsServ();


    //* 게시글 생성 API
    // 클라이언트에게 전달받는 데이터 있음
    createPost = async (req, res, next) => {
        try {
            // 클라이언트에개 전달받은 데이터를 객체구조 분해 할당 함.
            const { userId } = req.user;
            const { content } = req.body;

            const createPost = await this.postsService.createPost(
                userId, content
            );

            return res.status(200).json({ data: createPost })
        } catch (err) {
            next(err)
        }
    }


    //* 게시글 조회 API
    //클라이언트에게 전달받는 데이터 없음
    getPosts = async (req, res, next) => {
        try {
            const { userId } = req.user;

            const posts = await this.postsService.findAllPosts(userId);

            return res.status(200).json({ data: posts });
        } catch (err) {
            next(err);
        }
    }

}

