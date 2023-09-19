import { prisma } from '../utils/prisma/index.js'

export class PostsRepo {
    //* 게시글 생성 API
    createPost = async (userId, content) => {
        const createdPost = await prisma.posts.create({
            data: {
                UserId: userId,
                content
            }
        });
        return createdPost;
    };


    //* 게시글 조회 API
    findAllPosts = async (userId) => {
        const posts = await prisma.posts.findMany({
            where: {
                UserId: userId
            }
        });

        return posts;
    }


}