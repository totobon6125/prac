//# 저장소 계층과 연결하기
import { PostsRepo } from "../repositories/posts.repo.js"

export class PostsServ {
    postsRepository = new PostsRepo();
    
    
    //* 게시글 생성 API
    createPost = async (userId, content) => {
        const createdPost = await this.postsRepository.createPost(
            userId, content
        );

        return createdPost
    };


    //* 게시글 조회 API
    findAllPosts = async (userId) => {
        const posts = await this.postsRepository.findAllPosts(userId);
        //! posts 에는 contents 와 password 가 함께 조회되기 때문에 아래에서 map 을 통해 두 값을 제외한 나머지를 출력함.

        // 게시글을 생성 날짜로 부터 내림차순으로 정렬함.
        //# 정렬작업 하기 sort 로 인해 원본이 정렬 됨!!
        posts.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });

        // controller 에게 Reponse를 전달한다.
        return posts.map((post) => {
            return {
                postId: post.postId,
                content: post.content,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt
            }
        })
    }



};
