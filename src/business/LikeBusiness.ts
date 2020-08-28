import { LikeDatabase } from "../data/LikeDatabase";

const likeDatabase = new LikeDatabase();

export class LikeBusiness {
    public async likePost(userId:string, postId: string) {
        return await likeDatabase.likePost(userId, postId)
    }

    public async checkLike(userId:string, postId: string) {
        return await likeDatabase.checkLike(userId, postId)
    }

    public async dislikePost(userId:string, postId: string) {
        return await likeDatabase.dislikePost(userId, postId)
    }
}