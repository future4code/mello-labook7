import { BaseDatabase } from "./BaseDatabase";

export class LikeDatabase extends BaseDatabase {
    private static TABLE_NAME: string = "LikePost"

    public async likePost(userId: string, postId: string) :Promise<void> {
        await this.getConnection()
            .insert({
                userId: userId,
                postId: postId
            })
            .into(LikeDatabase.TABLE_NAME)
    }

    public async checkLike(userId: string, postId: string) :Promise<any> {
        const result = await this.getConnection().raw(`
            SELECT count FROM Like
            WHERE userId = "${userId}" AND postId = "${postId}"
        `)

        return result[0][0].count
    }

    public async dislikePost(userId: string, postId: string) :Promise<void> {
        await this.getConnection()
            .delete()
            .from(LikeDatabase.TABLE_NAME)
            .where({
                userId: userId,
                postId: postId
            })
    }
}